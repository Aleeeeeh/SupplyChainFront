import {useState} from 'react'
import Card from "../componentes/Card";
import { Calendar } from 'primereact/calendar';
import utilitarios from '../utils/utilitarios';
import produtoService from '../services/service/produtoService';
import FormGroup from '../componentes/FormGroup';
import * as mensagem from '../componentes/toastr'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

export default function RelatorioDeMovimentacaoProdutos(){
    const[data, setData] = useState<any>('');
    const[relatorio,setRelatorio] = useState<object[]>([]);
    const[tipoMovimentacao,setTipoMovimentacao] = useState('');
    const[nomePdf,setNomePdf] = useState('');

    const service = new utilitarios()
    const serviceProd = new produtoService();

    const exibirElementos = () =>{
        document.querySelector("#tabela")?.classList.remove("visually-hidden");
        document.querySelector("#botaoGeraPDF")?.classList.remove("visually-hidden");
    }

    const esconderElementos = () =>{
        document.querySelector("#tabela")?.classList.add("visually-hidden");
        document.querySelector("#botaoGeraPDF")?.classList.add("visually-hidden");
    }
    
    const consultar = () =>{
        if(data != null && tipoMovimentacao != ""){
            var dataEmString = service.converterObjetoEmString(data);
            var objetoDataFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(dataEmString);
            var mes = service.retornarNumeroDoMes(objetoDataFormatadoEmPosicoes[1])
            var ano = objetoDataFormatadoEmPosicoes[3]
    
            if(tipoMovimentacao == "entrada"){
                serviceProd.consultaEntradasMes(mes,ano)
                .then(response =>{
                    setRelatorio(response.data);
                    setNomePdf("Relatorio-mensal-entradas");
                });
            }else{
                serviceProd.consultaSaidasMes(mes,ano)
                .then(response =>{
                    setRelatorio(response.data);
                    setNomePdf("Relatório-mensal-saídas");
                });
            }
            
            exibirElementos();
        }else{
            esconderElementos();
            mensagem.mensagemAlerta("Por favor informe mês e o tipo da movimentação")
        }
    }

    const gerarPDF = () =>{
        var doc = new jsPDF({
            orientation: 'landscape',
            format: 'letter'
        })
        autoTable(doc,{html: "#tabela"});
        doc.save(`${nomePdf}.pdf`);
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
            <div className='row mt-2'>
                <div className='col-md-4'>
                    <FormGroup htmlfor="inputTipoMovimentacao" label="Tipo da movimentação">                  
                        <select className="form-control" onChange={(e:any)=>setTipoMovimentacao(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="saida">Saída</option>
                        </select>
                    </FormGroup>
                </div>
                <div className='mt-2'>
                    <button type="button" 
                            className="btn btn-primary" 
                            onClick={consultar}>
                                Consultar
                    </button>
                </div>
            </div>
            <div className='mt-5'>
            <table id='tabela' className="table table-hover visually-hidden">
                    <thead>
                        <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Número do registro</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Local</th>
                            <th scope="col">Data e hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            relatorio.map((response:any) =>{
                                return(
                                    <tr key={response.id}>
                                        <td>{response.produto.nome}</td>
                                        <td>{response.produto.numeroRegistro}</td>
                                        <td>{response.quantidade}</td>
                                        <td>{response.local}</td>
                                        <td>{response.dataEHora}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    )
}