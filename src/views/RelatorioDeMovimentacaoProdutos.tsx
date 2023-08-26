import {useState} from 'react'
import Card from "../componentes/Card";
import { Calendar } from 'primereact/calendar';
import utilitarios from '../utils/utilitarios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

export default function RelatorioDeMovimentacaoProdutos(){
    const[data, setData] = useState<any>('');

    const service = new utilitarios()

    const exibirElementos = () =>{
        document.querySelector("#tabela")?.classList.remove("visually-hidden");
        document.querySelector("#botaoGeraPDF")?.classList.remove("visually-hidden");
    }

    const esconderElementos = () =>{
        document.querySelector("#tabela")?.classList.add("visually-hidden");
        document.querySelector("#botaoGeraPDF")?.classList.add("visually-hidden");
    }
    
    if(data != null){
        var dataEmString = service.converterObjetoEmString(data);
        var objetoDataFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(dataEmString);
        var mes = service.retornarNumeroDoMes(objetoDataFormatadoEmPosicoes[1])
        var ano = objetoDataFormatadoEmPosicoes[3]
        exibirElementos();
        console.log(`Mês ${mes} e ano ${ano}`)
    }else{
        esconderElementos();
    }

    const gerarPDF = () =>{
        var doc = new jsPDF({
            orientation: 'landscape',
            format: 'letter'
        })
        autoTable(doc,{html: "#tabela"});
        doc.save('RelatórioMensal.pdf');
    }

    return(
        <Card title="Relatório de movimentação de produto">
            <div className="row">
                <div className='col-md-8'>
                    <label>Informe mês e ano &nbsp;</label>
                    <Calendar value={data} onChange={(e:any) => setData(e.target.value)} view="month" dateFormat="mm/yy" showButtonBar showIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className='col-md-4 d-flex justify-content-end'>
                    <button id='botaoGeraPDF'
                            className="btn btn-danger visually-hidden"
                            onClick={gerarPDF}>
                        <i className="pi pi-file-pdf" title='Gerar PDF'></i>
                    </button>
                </div>
            </div>
            <div className='mt-5'>
            <table id='tabela' className="table table-hover visually-hidden">
                    <thead>
                        <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Número do registro</th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Tipo do produto</th>
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ÁLCOOL GEL 70° 500ML</td>
                            <td>12345678910</td>
                            <td>SANTA CRUZ</td>
                            <td>Limpeza</td>
                            <td>Desenvolvido para limpeza e assepsia, é altamente indicado para uso hospitalar, na higienização de superfícies fixas e acessórios. Pode ser utilizado também como limpador geral, e para higiene das mãos.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    )
}