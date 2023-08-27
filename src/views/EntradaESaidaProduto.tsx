import { useState } from "react"
import Card from "../componentes/Card"
import FormGroup from "../componentes/FormGroup"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import * as mensagem from '../componentes/toastr'

export default function EntradaESaidaProduto(){
    const[quantidade,setQuantidade] = useState('');
    const[produto,setProduto] = useState('');

    const exibirElementos = () =>{
        document.querySelector("#resultado")?.classList.remove("visually-hidden");
    }

    const esconderElementos = () =>{
        document.querySelector("#resultado")?.classList.add("visually-hidden");
    }

    const confirmarMovimentacao = () =>{
        mensagem.mensagemSucesso("Movimentação realizada com sucesso");
    }

    const consultarEstoque = () =>{
        if(produto != ""){
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
                                <select className="form-control" id="inputIdProduto">
                                            <option value="">Selecione</option>
                                            <option value="1">Alcool</option>
                                            <option value="2">Desinfetante</option>
                                            <option value="3">Luvas</option>
                                </select>
                            </FormGroup>
                        </div>          
                        <div className="col-md-4">
                            <FormGroup htmlfor="inputTipoMovimentacao" label="Tipo da movimentação">                  
                                <select className="form-control" id="inputTipoMovimentacao">
                                            <option value="">Selecione</option>
                                            <option value="1">Entrada</option>
                                            <option value="2">Saída</option>
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
                        <div className="mt-4 d-flex justify-content-center">
                            <button type="button" 
                                    className="btn btn-primary" 
                                    onClick={confirmarMovimentacao}>
                                        Confirmar
                            </button>
                        </div> 
                    </div>
                </Tab>
                <Tab eventKey="consulta" title="Consulta de estoque">
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup htmlfor="inputIdProduto" label="Produtos">                  
                                <select className="form-control" 
                                        id="inputIdProduto" 
                                        onChange={(e:any) => {setProduto(e.target.value)}}>
                                            <option value="">Selecione</option>
                                            <option value="1">Alcool</option>
                                            <option value="2">Desinfetante</option>
                                            <option value="3">Luvas</option>
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