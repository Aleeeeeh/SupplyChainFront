import { useEffect, useState } from "react"
import Card from "../componentes/Card"
import FormGroup from "../componentes/FormGroup"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import utilitarios from "../utils/utilitarios";
import produtoService from "../services/service/produtoService";
import { Calendar } from 'primereact/calendar';
import * as mensagem from '../componentes/toastr'

export default function EntradaESaidaProduto(){
    const[quantidade,setQuantidade] = useState('');
    const[produtos,setProdutos] = useState<object[]>([]);
    const[produtoID,setProdutoID] = useState('');
    const[tipoMovimentacao,setTipoMovimentacao] = useState('');
    const[local,setLocal] = useState('');
    const[data,setData] = useState('');
    const[hora,setHora] = useState('');
    const[dataEHora,setDataEHora] = useState('');

    const service = new utilitarios();
    const serviceProd = new produtoService();

    useEffect(()=>{
        serviceProd.consultarProdutos()
        .then(response =>{
            setProdutos(response.data);
        })
    },[])

    const exibirElementos = () =>{
        document.querySelector("#resultado")?.classList.remove("visually-hidden");
    }

    const esconderElementos = () =>{
        document.querySelector("#resultado")?.classList.add("visually-hidden");
    }

    const formatarDataEHora = () =>{
        if(data != "" && data != null && hora != "" && hora != null) {
            var dataEmString = service.converterObjetoEmString(data);
            var objetoDataFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(dataEmString);
            var mes = service.retornarNumeroDoMes(objetoDataFormatadoEmPosicoes[1])
            var dia = objetoDataFormatadoEmPosicoes[2]
            var ano = objetoDataFormatadoEmPosicoes[3]

            var horaEmString = service.converterObjetoEmString(hora);
            var objetoHoraFormatadoEmPosicoes = service.converterStringEmObjetoFormatado(horaEmString);
            var horaFormatada = objetoHoraFormatadoEmPosicoes[4]

            setDataEHora(`${ano}-${mes}-${dia}T${horaFormatada}`)
        }
    } 

    const confirmarMovimentacao = () =>{
        formatarDataEHora();
        const objetoMovimentacao = {
            quantidade: parseInt(quantidade),
            local: local,
            dataEHora: dataEHora,
            produtoID: parseInt(produtoID)
        }

        if(tipoMovimentacao == "" || tipoMovimentacao == null){
            mensagem.mensagemErro("Informe o tipo da movimentação");
        }

        try{
            serviceProd.validarMovimentacao(objetoMovimentacao)
        }catch(error:any){
            const mensagens = error.mensagens;
            mensagens.forEach((msg:string)=>mensagem.mensagemErro(msg));
            return false;
        }

        if(tipoMovimentacao == "entrada")
        {
            serviceProd.entradaProduto(objetoMovimentacao)
            .then(response => {
                mensagem.mensagemSucesso("Entrada de produto feita com sucesso");
                console.log(response);
            }).catch(error => {
                mensagem.mensagemErro(error.response);
            })
        }else{
            serviceProd.saidaProduto(objetoMovimentacao)
            .then(response => {
                mensagem.mensagemSucesso("Saída de produto feita com sucesso");
                console.log(response);
            }).catch(error => {
                mensagem.mensagemErro(error.response);
            })
        }

        console.log(objetoMovimentacao);
        console.log(tipoMovimentacao)

    }

    const consultarEstoque = () =>{
        if(setProdutoID != null){
            mensagem.mensagemSucesso("Consulta realizada com sucesso");
            exibirElementos();
        }else{
            esconderElementos();
        }
    }

    return(
        <Card title="Controle de estoque">
            <Tabs
                defaultActiveKey="movimentacao"
                id="uncontrolled-tab-example"
                className="mb-3">
                <Tab eventKey="movimentacao" title="Movimentação de produto">
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup htmlfor="inputIdProduto" label="Produtos">                  
                                <select className="form-control" onChange={(e:any)=>setProdutoID(e.target.value)}>
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
                        <div className="col-md-4">
                            <FormGroup htmlfor="inputTipoMovimentacao" label="Tipo da movimentação">                  
                                <select className="form-control" onChange={(e:any)=>setTipoMovimentacao(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="entrada">Entrada</option>
                                            <option value="saida">Saída</option>
                                </select>
                            </FormGroup>
                        </div>     
                        <div className="col-md-4">
                            <FormGroup htmlfor="inputQuantidade" label="Quantidade">
                                <input type="number" 
                                        id="inputQuantidade"
                                        className="form-control"
                                        name="inputQuantidade"
                                        value={quantidade}
                                        onChange={((e:any) => setQuantidade(e.target.value))}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup htmlfor="inputLocal" label="Local">
                                <input type="text" 
                                        id="inputLocal"
                                        className="form-control"
                                        name="inputLocal"
                                        value={local}
                                        onChange={((e:any) => setLocal(e.target.value))}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <Calendar value={data} onChange={(e:any) => setData(e.target.value)} inline showWeek />
                        </div>
                        <div className="col-md-4">
                            <Calendar value={hora} onChange={(e:any) => setHora(e.target.value)} placeholder="horário" timeOnly />
                        </div>
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick={confirmarMovimentacao}>
                                    Confirmar
                        </button>
                    </div> 
                </Tab>
                <Tab eventKey="consulta" title="Consulta de estoque">
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup htmlfor="inputIdProduto" label="Produtos">                  
                                <select className="form-control" 
                                        id="inputIdProduto" 
                                        onChange={(e:any) => {setProdutoID(e.target.value)}}>
                                            <option value="">Selecione</option>
                                            {
                                                produtos.map((prod:any)=>{
                                                    return(
                                                        <option key={prod.id} value={prod.id}>{prod.nome}</option>
                                                    )
                                                })
                                            }
                                </select>
                            </FormGroup>
                            <div className="mt-4">
                                <button type="button" 
                                        className="btn btn-primary" 
                                        onClick={consultarEstoque}>
                                            Consultar
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 text-center visually-hidden" id="resultado"> 
                            <h2><b className="text-danger">Estoque total</b></h2>
                            <h3><b>50</b></h3>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </Card>
    )
}