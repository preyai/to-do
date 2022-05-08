import { useEffect, useState } from "react";
import { getTasks } from "../helpers/tasks";
import { tasksActions, tasksState } from "../interfaces/state";
import { IPagination, ISort, ITask } from "../interfaces/task";

const useTaskState = (): { state: tasksState } => {
    const [list, setList] = useState<ITask[]>([])
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<ISort>()
    const [isLogin, setIsLogin] = useState(false)
    const [pagination, setPagination] = useState<IPagination>()

    const update = () => {

        getTasks(state).then(({ data, total }) => {
            setList(data)
            setTotal(total)
        })
    }

    const actions: tasksActions = {
        setList,
        setTotal,
        setSort,
        setPagination,
        setIsLogin,
        update
    }

    const state: tasksState = {
        list,
        total,
        sort,
        pagination,
        actions,
        isLogin
    }

    useEffect(() => {
        if (localStorage.getItem('jwt'))
            setIsLogin(true)
        update()
    }, [])
    useEffect(update, [sort, pagination])
    useEffect(() => setPagination({ page: 1, offset: 0 }), [sort])

    return { state }
}

export default useTaskState