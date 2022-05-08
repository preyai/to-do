
type OrderType = 'desc' | 'asc'

export interface ISort {
    field: string
    order: OrderType
}

export interface IPagination {
    page: number
    offset: number
}

export interface ITask {
    _id: string,
    userName: string,
    email: string,
    text: string,
    status?: boolean,
    changed?: boolean
}

