import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext({})

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [openMenu, setOpenMenu] = useState<string>('close')
    const handleOpenMenu = (item: string) => {
        setOpenMenu(item)
    }

    return <AppContext.Provider value={{ openMenu, setOpenMenu, handleOpenMenu }}>
        {children}
    </AppContext.Provider >
}