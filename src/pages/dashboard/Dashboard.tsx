import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasedePagina } from '../../shared/layouts';


export const Dashboard = () => {
  return(
    <LayoutBasedePagina 
      titulo='pagina inicial' 
      barraDeFerramentas={(
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
      )
      }>
     testando
    </LayoutBasedePagina>
  );
};