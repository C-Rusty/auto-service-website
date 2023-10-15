import {createContext, Dispatch, SetStateAction} from "react";

type showInitialTime = IInitialTime;

interface IInitialTime {
    isAdminComponent: boolean
    setIsAdminComponent: Dispatch<SetStateAction<boolean>>
};

const FormContext = createContext({} as showInitialTime);

export default FormContext;