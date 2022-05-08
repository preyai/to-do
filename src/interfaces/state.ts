import { Dispatch, SetStateAction } from "react";
import { ITask, ISort, IPagination } from "./task";

export interface tasksState {
    list: ITask[],
    sort?: ISort,
    pagination?: IPagination,
    total?: number,
    actions?: tasksActions,
    isLogin: boolean
}

export interface tasksActions {
    setList: Dispatch<SetStateAction<ITask[]>>,
    setTotal: Dispatch<SetStateAction<number>>,
    setSort: Dispatch<SetStateAction<ISort | undefined>>,
    setPagination: Dispatch<SetStateAction<IPagination | undefined>>,
    setIsLogin: Dispatch<SetStateAction<boolean>>,
    update: () => void
}