import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


export default function Header() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');;


    const clearLocalStorage = () => {
      localStorage.clear()
      window.location.reload();
    }

    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Лого
          </Typography>
          {user?.token != undefined && 
          (<Button color="inherit" onClick={() => clearLocalStorage()}>Выход</Button>)}

        </Toolbar>
      </AppBar>
    </Box>
  );
}