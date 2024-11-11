import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext({})

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [openMenu, setOpenMenu] = useState<string>('close')
    const handleOpenMenu = (item: string) => {
        setOpenMenu(item)
    }

    const setLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getLocalStorage = (key: string) => {
        const getUser = localStorage.getItem(key);
        const user = getUser ? JSON.parse(getUser) : {}
        return user
    }

    return <AppContext.Provider value={{ openMenu, setOpenMenu, handleOpenMenu, setLocalStorage, getLocalStorage }}>
        {children}
    </AppContext.Provider >
}