import { Box, Button, Card, CardActions, CardContent, Grid, Icon, Switch, TextField, Typography } from '@mui/material';

import { useAppThemeContext, useAuthContext } from '../../contexts';
import { useState } from 'react';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5)
});
interface ILoginProps{
  children?: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({children}) => {
  const { toggleTheme } = useAppThemeContext();
  const{ isAuthenticated, login } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleSubmit = () => {
    isLoading(true);

    loginSchema
      .validate({email, password}, {abortEarly: false})
      .then(dadosValidados =>{
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {

            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        isLoading(false);

        errors.inner.forEach(error => {
          if(error.path === 'email') {
            setEmailError(error.message);
          }else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });

      
  };
  if (isAuthenticated) return (
    <>{children}</>
  );

    
  return (

    <Box width='100vw' height='100vh' display='flex' justifyContent={'center'} alignItems={'center'}>
      
      <Box display='flex' sx={{ position: 'absolute', left: 10, bottom: 10 }} flexDirection='column'>
        <Grid>toggleTheme</Grid>
        <Switch 

          onChange={toggleTheme}
          icon={<Icon>light_mode</Icon>} 
          checkedIcon={<Icon>dark_mode</Icon>} />

      </Box>


      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography>Identifique-se</Typography>

            <TextField
              type='Email'
              label='Email'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => setEmail(e.target.value)}
            />
            
            <TextField
              label='Senha'
              type='password'
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => setPassword(e.target.value)}
            />

          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Entrar
            </Button>

          </Box>

        </CardActions>

      </Card>

    </Box>
    

  );
};