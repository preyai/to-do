import { Pagination } from "@mui/material"
import { ChangeEvent } from "react"
import { useStateContext } from "../contexts/stateContext"

const TaskPagination = () => {
    const { pagination, total, actions } = useStateContext()

    const handler = (event: ChangeEvent<unknown>, value: number) => {
        actions?.setPagination({
            page: value,
            offset: (value - 1) * 3
        })
    }


    if (pagination && total)
        return (
            <Pagination count={Math.ceil(total/3)} page={pagination.page} onChange={handler} />
        )
    else
        return null
}

export default TaskPagination