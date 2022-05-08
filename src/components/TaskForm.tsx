import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import { useStateContext } from "../contexts/stateContext"
import { createTask } from "../helpers/tasks"

const TaskForm = () => {
    const { actions } = useStateContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState('')

    const inputHandler = (dispatch: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
        return (event) => {
            setError('')
            dispatch(event.target.value)
        }
    }
    
    const sendForm = () => {
        createTask(name, email, text)
            .then((r) => actions?.update)
            .catch((e) => setError(e.message))
    }

    return (
        <>
            <Typography variant='h4' my={4}>Новая задача</Typography>
            {error &&
                <Alert severity="error">{error}</Alert>
            }
            <Stack direction="row" spacing={2}>
                <TextField
                    value={name}
                    onChange={inputHandler(setName)}
                    label="Имя"
                    variant="outlined"
                />
                <TextField
                    value={email}
                    onChange={inputHandler(setEmail)}
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    value={text}
                    onChange={inputHandler(setText)}
                    label="Текст"
                    variant="outlined"
                    multiline
                    fullWidth
                />
                <Button variant="outlined" onClick={sendForm}>Создать</Button>
            </Stack>

        </>
    )
}

export default TaskForm