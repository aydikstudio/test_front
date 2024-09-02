import { Button, FormControl, Input, InputLabel } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useState } from "react";
import axios from "axios";
import TelegramLoginButton from "../../components/TelegramButton/TelegramButton";



interface IFormInput {
    name: string
    email?: string,
    password: string
}

export const Auth = () => {

  
    const [value, setValue] = useState('login');
    const { register, handleSubmit } = useForm<IFormInput>()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if(value == 'login') {
            try {
                const user:any = await axios.post(process.env.REACT_APP_API_URL+'/login', data)
                if(user) {
                    localStorage.setItem('user', JSON.stringify(user.data));
                    window.location.href = "/";
              }
            } catch (e:any) {
                console.log(e.message)
            }
           
        } else {
            try {
                const user =  await axios.post(process.env.REACT_APP_API_URL+'/registration', data) 
            
                if(user) {
                    window.alert('Регистрация прошла успешна')
                    window.location.reload();
              }
            } catch (e:any) {
                console.log(e.message)
            }
         
        }
    }

    const handleBot = async (usertg: any) => {

     
        try {
            const user:any = await axios.post(process.env.REACT_APP_API_URL+'/logintelegram', {
                name: usertg.username

            })
            if(user) {
                localStorage.setItem('user', JSON.stringify(user.data));
                window.location.href = "/";
          }
        } catch (e:any) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Регистрация" value="registration" />
                            <Tab label="Вход" value="login" />
                        </TabList>
                    </Box>
                    <TabPanel value="registration"><form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{
                            width: '100%',
                            marginTop: '20px'
                        }}>

                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" {...register("email")} />
                        </FormControl>

                        <FormControl sx={{
                            width: '100%',
                            marginTop: '20px'
                        }}>

                            <InputLabel htmlFor="my-input">Nic</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" {...register("name")} />
                        </FormControl>

                        <FormControl sx={{
                            width: '100%',
                            marginTop: '20px'
                        }}>

                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" {...register("password")} type="password" />
                        </FormControl>

                        <Button type="submit" sx={{
                            marginTop: '20px'
                        }}>
                            Регистрация
                        </Button>
                    </form></TabPanel>


                    <TabPanel value="login"><form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{
                            width: '100%',
                            marginTop: '20px'
                        }}>

                            <InputLabel htmlFor="my-input">Nic</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" {...register("name")} />
                        </FormControl>

                        <FormControl sx={{
                            width: '100%',
                            marginTop: '20px'
                        }}>

                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" {...register("password")} type="password" />
                        </FormControl>

                        <Button type="submit" sx={{
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}>
                            Войти
                        </Button>
                    </form>
                    
                    {/* <Button variant="outlined"><TelegramIcon />Вход через telegram</Button> */}
                    <TelegramLoginButton
                        botName='TgAngularMiniAydikstudioBot'
                        buttonSize="large"
                        cornerRadius={3}
                        usePic={false}
                        dataOnauth={handleBot}
                    />
        
                    </TabPanel>

                </TabContext>
            </Box>
        </div>
    )
}