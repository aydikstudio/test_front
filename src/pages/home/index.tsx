

export const Home = () => {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div>
            Привет, {user?.name}
        </div>
    )
}