
import { Avatar, Box, Button, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const{isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

  return(
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        
        <Box width={theme.spacing(28)} display='flex' >
          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            
            <Avatar 
              src='/static/images/avatar/1.jpg'
              sx={{height: theme.spacing(12), width: theme.spacing(12)}}
            />
          </Box>


        </Box>

        <Divider>

          <Box flex={1}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                  <ListItemText primary='página inicial'/>
                </ListItemIcon>
              </ListItemButton>

            </List>
          </Box>

        </Divider>
            
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 :theme.spacing(28)}>
        {children}
      </Box>
        
    </>
  );
};