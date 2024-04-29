import { Box, Card, CardContent, Grid, Typography, debounce } from '@mui/material';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';


export const Dashboard = () => {
  
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCidades(result.totalCount);
            
        }
      });

    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false);
  
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPessoas(result.totalCount);
              
        }
      });
  }, []);


  return(
    <LayoutBaseDePagina 
      titulo='pagina inicial' 
      barraDeFerramentas={
        <FerramentasDaListagem mostrarBotaoNovo = {false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
           
            <Grid item xs={12} sm={12} md={6} xl={4}>
              
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPessoas && (
                      <Typography variant='h1' >
                        {totalCountPessoas}
                      </Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant='h5' align='center'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={4}>
              
              <Card>
                <CardContent>

                  <Typography variant='h5' align='center'>
                      TotalCidades
                  </Typography>
                 
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCidades && (
                      <Typography variant='h1' >
                        {totalCountCidades}
                      </Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant='h5' align='center'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>

    </LayoutBaseDePagina>
    
  );
};