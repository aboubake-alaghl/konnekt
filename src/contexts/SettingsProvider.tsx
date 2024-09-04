import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
    isRTL: boolean
    setRTLMode: (param: boolean) => void
};

export const SettingsContext = createContext<SettingsContextType>({ isRTL: false, setRTLMode: () => { } });
export const useRTL = () => useContext(SettingsContext);

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        const rtl = localStorage.getItem('rtl');
        if (rtl === 'true') {
            setRTLMode(true);
        } else if (rtl === 'false') {
            setRTLMode(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const setRTLMode = (param: boolean) => {
        setIsRTL(param);
        if (param) {
            localStorage.setItem("rtl", 'true');
            document.dir = 'rtl';
        } else {
            localStorage.setItem("rtl", 'false');
            document.dir = 'ltr';
        }
    }

    return (
        <SettingsContext.Provider value={{ isRTL, setRTLMode }}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsProvider;