import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';


interface ILayoutBaseDePaginaProps {
  children?: React.ReactNode;
  titulo:string
}

export const LayoutBasedePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const {toggleDrawerOpen}= useDrawerContext();
  return(
    <Box height={'100%'} display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems='center' height={theme.spacing(12)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
       
        <Typography variant='h5'>
          {titulo}
        </Typography>

      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};