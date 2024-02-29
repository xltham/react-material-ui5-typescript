import { Button } from '@mui/material';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route
        path="/pagina-inicial"
        element={
          <div>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={toggleTheme}>
              <p>toggle theme</p>
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={toggleDrawerOpen}>
              <p>toggle drawer</p>
            </Button>
          
          </div>
        }
      />
    </Routes>
  );
};
