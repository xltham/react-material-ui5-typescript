import {createContext, useCallback, useContext, useState} from 'react';

interface IDrawerOptions {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen?: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IAppDrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider : React.FC<IAppDrawerProviderProps>  = ({ children }) => {
  const [isDrawerOpen, setThemeName] = useState(false);
  
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
  
  const toggleDrawerOpen = useCallback(() => {
    setThemeName(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return(
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  );
};

