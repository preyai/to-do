import { createContext, useContext } from "react";
import { tasksState } from "../interfaces/state";

const stateContext = createContext<tasksState>({
    list:[],
    isLogin:false,
})

export const useStateContext = () => useContext(stateContext)

export default stateContext