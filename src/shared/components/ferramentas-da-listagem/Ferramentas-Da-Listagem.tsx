import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IBarraDeFerramentasProps{
  textoDeBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IBarraDeFerramentasProps> = ({
  textoDeBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = 'true',
  aoClicarEmNovo
}) => {
  
  const theme = useTheme();
  
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (

        <TextField
          size='small'
          value={textoDeBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder='Pesquisar...'
        />
      )}

      <Box flex={1} display={'flex'} justifyContent='end'>
        {mostrarBotaoNovo && (
          <Button 
            disableElevation 
            variant='contained'
            color='primary'
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}>
            {textoBotaoNovo}
          </Button>
        )}
        
      </Box>
    </Box>
  );
};