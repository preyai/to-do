import { Box, Checkbox, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { apiUri } from "../constants";
import { useStateContext } from "../contexts/stateContext";
import { ITask } from "../interfaces/task";
import EditableText from "./EditableText";

interface IColumn {
    field: string,
    label: string,
    flex: number,
}

const columns: IColumn[] = [
    {
        field: 'userName',
        label: 'Имя',
        flex: 1,
    },
    {
        field: 'email',
        label: 'email',
        flex: 1,
    },
    {
        field: 'text',
        label: 'Текст',
        flex: 5,
    },
    {
        field: 'status',
        label: 'Статус',
        flex: 1,
    }
]

const TasksList = () => {
    const { list, sort, isLogin, actions } = useStateContext()

    const sortHandler = (field: string) => {
        if (!sort || sort.field !== field)
            actions?.setSort({ field, order: 'asc' })
        else
            actions?.setSort({ field, order: sort.order === 'asc' ? 'desc' : 'asc' })
    }

    const compliteTask = (task: ITask) => {
        const body = JSON.stringify({
            status: true
        })
        fetch(`${apiUri}/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
            .then(() => actions?.update())
    }

    return (
        <List>
            <ListItem >
                {columns.map((column) => (
                    <ListItemButton
                        onClick={column.field !== 'text' ? () => sortHandler(column.field) : undefined}
                        sx={{ flex: column.flex }}
                        key={column.field}>
                        <ListItemText primary={column.label} />
                    </ListItemButton>
                ))}
            </ListItem>
            {
                list.map(toDoItem => (
                    <ListItem key={toDoItem._id} >

                        <ListItemText primary={toDoItem.userName} sx={{ flex: 1, padding: '8px 16px' }} />
                        <ListItemText primary={toDoItem.email} sx={{ flex: 1, padding: '8px 16px' }} />
                        {!isLogin ?
                            <ListItemText primary={toDoItem.text} secondary={toDoItem.changed && 'отредактировано администратором'} sx={{ flex: 5, padding: '8px 16px' }} />
                            :
                            <EditableText toDoItem={toDoItem} />
                        }
                        {!isLogin ?
                            <ListItemText primary={toDoItem.status ? 'Выполнена' : 'В процессе'} sx={{ flex: 1, padding: '8px 16px' }} />
                            :
                            <Box sx={{ flex: 1 }} >
                                <Checkbox
                                    checked={toDoItem.status}
                                    onChange={() => compliteTask(toDoItem)}
                                />
                            </Box>
                        }
                    </ListItem>
                ))
            }
        </List >

    )
}

export default TasksList