import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/stateContext"

const Header = () => {
    const { isLogin, actions } = useStateContext()
    const navigate = useNavigate()

    const handler = () => {
        if (isLogin) {
            localStorage.removeItem('jwt')
            actions?.setIsLogin(false)
        }
        else
            navigate('/login')
    }
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tasks
                </Typography>
                <Button onClick={handler} color="inherit">{isLogin ? 'Выйти' : 'Войти'}</Button>
            </Toolbar>
        </AppBar>
    )
}


export default Header