import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserImagesContext = createContext()

export function UserImagesProvider({ children }) {
    const [images, setImages] = useLocalStorage('images', [])

    return (
        <UserImagesContext.Provider value={{images, setImages}}>
            {children}
        </UserImagesContext.Provider>
    )
}