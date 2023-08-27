import {useState} from 'react'
import Card from "../componentes/Card";
import { Calendar } from 'primereact/calendar';
import FormGroup from '../componentes/FormGroup';
import utilitarios from '../utils/utilitarios'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(Tooltip,Legend,ArcElement);

export default function MovimentacaoProdutosGrafico(){
    const[data, setData] = useState<any>('');
    const[idProduto,setIdProduto] = useState<any>('');
    const[descricaoProduto,setDescricaoProduto] = useState('Alcool');

    const service = new utilitarios();

    const dataGrafico = {
        labels: [
          'Total saídas',
          'Total entradas'
        ],
        datasets: [{
          label: ""+[descricaoProduto]+"",
          data: [200, 300],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4,
        }]
      };

    if(data != null && idProduto != ""){
        var dataEmString = service.converterObjetoEmString(data);
        var objetoDataFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(dataEmString);
        var mes = service.retornarNumeroDoMes(objetoDataFormatadoEmPosicoes[1])
        var ano = objetoDataFormatadoEmPosicoes[3]
        console.log(`Mes ${mes} e ano ${ano} e produto ${idProduto}`)
    }

    return(
        <Card title="Gráfico de movimentação de produtos por mês">
            <div className='row d-flex justify-content-center'>
                <div className='col-md-4'>
                    <label>Informe mês e ano &nbsp;</label>
                    <Calendar value={data} onChange={(e:any) => setData(e.target.value)} view="month" dateFormat="mm/yy" showButtonBar showIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className='col-md-4'>
                    <FormGroup htmlfor="inputIdProduto" label="Produtos">
                        <select className="form-control" 
                                id="inputIdProduto" 
                                onChange={(e:any) => setIdProduto(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="1">Alcool</option>
                            <option value="2">Desinfetante</option>
                            <option value="3">Luvas</option>
                        </select>
                    </FormGroup>
                </div>
                <div className='mt-4'>
                    <Doughnut data={dataGrafico} width={400} height={300} options={{ maintainAspectRatio: false }}/>
                </div>
            </div>  
        </Card>
    )
}