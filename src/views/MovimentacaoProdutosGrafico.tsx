import {useEffect, useState} from 'react'
import Card from "../componentes/Card";
import { Calendar } from 'primereact/calendar';
import FormGroup from '../componentes/FormGroup';
import utilitarios from '../utils/utilitarios'
import produtoService from '../services/service/produtoService';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(Tooltip,Legend,ArcElement);

export default function MovimentacaoProdutosGrafico(){
    const[data, setData] = useState<any>('');
    const[produtos,setProdutos] = useState<object[]>([]);
    const[idProduto,setIdProduto] = useState<object[]>([]);
    const[totalEntrada,setTotalEntrada] = useState(0);
    const[totalSaida,setTotalSaida] = useState(0);

    const service = new utilitarios();
    const serviceProd = new produtoService();

    useEffect(() =>{
        serviceProd.consultarProdutos()
        .then(response => {
            setProdutos(response.data);
        })
    },[])

    if(data != null && idProduto != null){
        var dataEmString = service.converterObjetoEmString(data);
        var objetoDataFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(dataEmString);
        var mes = service.retornarNumeroDoMes(objetoDataFormatadoEmPosicoes[1])
        var ano = objetoDataFormatadoEmPosicoes[3]

        serviceProd.consultarEntradaProdutoMes(mes,ano,idProduto)
        .then(response =>{
            setTotalEntrada(response.data);
        })

        serviceProd.consultarSaidaProdutoMes(mes,ano,idProduto)
        .then(response =>{
            setTotalSaida(response.data);
        })
    }

    const dataGrafico = {
        labels: [
          'Total saídas',
          'Total entradas'
        ],
        datasets: [{
          label: "Quantidade",
          data: [totalSaida, totalEntrada],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4,
        }]
      };

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
                            {
                                produtos.map((prod:any) =>{
                                    return(
                                        <option key={prod.id} value={prod.id}>{prod.nome}</option>
                                    )
                                })
                            }
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