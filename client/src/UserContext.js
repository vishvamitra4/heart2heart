import { createContext, useState } from "react";

export const USerContext = createContext({});

export function USerContextProvider({ children }) {

    
    const [userInfo, setUserInfo] = useState({});
    return (
        <USerContext.Provider value ={{ userInfo, setUserInfo }}>
            {children}
        </USerContext.Provider>


    )
}

