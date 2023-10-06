import { createContext, useContext, useState } from 'react';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('+33112121212');

    return (
        <CurrentUserContext.Provider value={{ currentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
