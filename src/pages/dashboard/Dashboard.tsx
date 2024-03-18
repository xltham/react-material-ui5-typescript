import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {
  return(
    <LayoutBaseDePagina 
      titulo='pagina inicial' 
      barraDeFerramentas={(
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
      )
      }>
     testando
    </LayoutBaseDePagina>
  );
};