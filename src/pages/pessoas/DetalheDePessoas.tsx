import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { Box, LinearProgress, TextField } from '@mui/material';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id='nova'} = useParams<'id'>();
  const navigate = useNavigate();
  
  const formRef = useRef<FormHandles>(null);

  const[isLoading, setIsLoading] = useState(false);
  const[nome, setnome] = useState('');
  const[rows, setrows] = useState();

  useEffect(() => {
    if( id !== 'nova'){
      setIsLoading (true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error){
            alert(result.message);
            navigate('/pessoas');
          }else{
            setnome(result.nomeCompleto);
            console.log(result);

            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData ) => {
    setIsLoading(true);

    if(id === 'nova'){
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);
          
          if(result instanceof Error){
            alert(result.message);
          }else{
            navigate(`/pessoas/detalhe/${result}`);
          }
        });

    } else {
      PessoasService
        .updateById(Number(id), {id:Number(id), ...dados})
        .then((result)=>{
          setIsLoading(false);
      
          if(result instanceof Error){
            alert(result.message);
          }});
    }
  };

  const handleDelete =  (id: number) => {

    if (confirm('realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  };


  return (
    <LayoutBaseDePagina 
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />

      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}





      <Form ref={formRef} onSubmit={handleSave}>

        <Box margin={1} display='flex'>
          <VTextField placeholder= 'Nome Completo' name= 'nomeCompleto' />
          <VTextField placeholder= 'Email' name= 'email' />      
          <VTextField placeholder= 'Cidade id' name= 'cidadeId' />
        </Box>
         
      </Form>
    </LayoutBaseDePagina>

  );
};