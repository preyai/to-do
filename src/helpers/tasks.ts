import { apiUri } from "../constants";
import { tasksState } from "../interfaces/state";
import { ITask } from "../interfaces/task"

export const getTasks = async (todos: tasksState): Promise<{ data: ITask[]; total: number }> => {

    const params = new URLSearchParams()
    if (todos.pagination?.offset)
        params.set('offset', todos.pagination.offset.toString())
    if (todos.sort) {
        params.set('sortField', todos.sort.field)
        params.set('sortOrder', todos.sort.order)
    }

    const response = await fetch(`${apiUri}/tasks?` + params, { method: 'GET', mode: 'cors' })
    const { data, total }: { data: ITask[], total: number } = await response.json()

    return { data, total }
}

export const createTask = async (userName: string, email: string, text: string) => {
    const body = JSON.stringify({
        userName,
        email,
        text
    })

    const response = await fetch(`${apiUri}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })

    const json = await response.json()

    if (json.status === 200)
        return json
    else
        throw new Error(json.message)
}