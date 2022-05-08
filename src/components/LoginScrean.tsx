import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUri } from "../constants"
import { useStateContext } from "../contexts/stateContext"

const LoginScrean = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const {actions} = useStateContext()

    const inputHandler = (dispatch: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
        return (event) => {
            setError('')
            dispatch(event.target.value)
        }
    }

    const send = async () => {
        const body = JSON.stringify({
            login,
            password
        })


        const response = await fetch(`${apiUri}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
        const data = await response.json()
        if (response.status === 200){
            console.log(data.jwt);
            
            localStorage.setItem('jwt', data.jwt)
            actions?.setIsLogin(true)
            navigate('/')
        }
        else
            setError(data.message)
    }

    return (
        <Stack spacing={4} alignItems="center">
            <Typography variant='h4' mt={4}>Войти</Typography>
            {error &&
                <Alert severity="error">{error}</Alert>
            }
            <TextField
                value={login}
                onChange={inputHandler(setLogin)}
                label="Логин"
                variant="outlined"
            />
            <TextField
                value={password}
                onChange={inputHandler(setPassword)}
                type="password"
                label="Пароль"
                variant="outlined"
            />
            <Button onClick={send} variant="outlined" size="large">Войти</Button>
        </Stack>
    )
}

export default LoginScrean