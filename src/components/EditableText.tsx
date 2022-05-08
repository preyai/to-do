import { Button, Stack, TextField } from "@mui/material"
import { ChangeEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUri } from "../constants"
import { ITask } from "../interfaces/task"

interface EditableTextProps {
    toDoItem: ITask
}

const EditableText = ({ toDoItem }: EditableTextProps) => {
    const [text, setText] = useState(toDoItem.text)

    const navigate = useNavigate()

    const changeText: ChangeEventHandler<HTMLInputElement> = (event) => setText(event.target.value)
    const save = () => {
        const body = JSON.stringify({
            text
        })
        const token = localStorage.getItem('jwt')
        if (!token) {
            navigate('/login')
            return
        }
        fetch(`${apiUri}/tasks/${toDoItem._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body
        })
    }

    return (
        <Stack direction='row' sx={{ flex: 5 }} >
            <TextField
                value={text}
                onChange={changeText}
                helperText={toDoItem.changed && 'отредактировано администратором'}
                multiline />
            <Button onClick={save}>Сохранить</Button>
        </Stack>
    )
}

export default EditableText