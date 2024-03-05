
import { Avatar, Box, Button, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import React from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
  to: string,
  icon: string,
  label: string,
  onClick: (() => void) | undefined
}
const ListItemLink: React.FC<IListItemLinkProps>= ({ to, icon, label, onClick}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false});
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  
  return(
    <ListItemButton selected={!!match} onClick= {handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItemButton>
  );
};
interface IMenuLateralProps {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  
  const{isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  const{ toggleTheme } = useAppThemeContext();

  return(
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column' >
          
          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            
            <Avatar 
              src='/static/images/avatar/1.jpg'
              sx={{height: theme.spacing(12), width: theme.spacing(12)}}
            />
          </Box>

          <Divider/>
          
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          
          <Box>
            <List component='nav'>
              <ListItemButton onClick= {toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary='Alternar Tema'/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
            
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 :theme.spacing(28)}>
        {children}
      </Box>
        
    </>
  );
};