import { Box, Container } from "@mui/material"
import TaskForm from "./TaskForm"
import TaskPagination from "./TaskPagination"
import TasksList from "./TasksList"

const MainScrean = () => {
    return (
        <Box>
            <Container>
                <TasksList />
                <TaskPagination />
                <TaskForm />
            </Container>
        </Box>
    )
}

export default MainScrean