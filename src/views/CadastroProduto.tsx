import { useState } from "react";
import Card from "../componentes/Card";
import FormGroup from "../componentes/FormGroup";
import produtoService from "../services/service/produtoService";
import * as mensagem from '../componentes/toastr'

export default function CadastroProduto(){
    const[nomeProduto, setNomeProduto] = useState('')
    const[numeroRegistro, setNumeroRegistro] = useState('')
    const[fabricante, setFabricante] = useState('')
    const[tipoProduto, setTipoProduto] = useState('')
    const[descricao, setDescricao] = useState('')

    const service = new produtoService();

    const cadastrarProduto = () =>{
        const objetoProduto = {
            nome: nomeProduto,
            numeroRegistro: parseInt(numeroRegistro),
            fabricante: fabricante,
            tipoProduto: tipoProduto,
            descricao: descricao
        }
        
        try{
            service.validacaoCadastro(objetoProduto)
        }catch(error:any){
            const mensagens = error.mensagens;
            mensagens.forEach((msg:string)=>mensagem.mensagemErro(msg));
            return false;
        }

        service.salvar(objetoProduto)
        .then(response=>{
            mensagem.mensagemSucesso("Produto cadastrados com sucesso");
            setNomeProduto('');
            setNumeroRegistro('');
            setFabricante('');
            setTipoProduto('');
            setDescricao('');
            console.log(response.data);
        })
        .catch(error =>{
            mensagem.mensagemErro(error.response);
        })
    }

    return(
        <Card title="Cadastro de produto">
            <div className="row">
                <div className="col-md-3">
                    <FormGroup htmlfor="inputNome" label="Nome do produto">
                        <input type="text" 
                                id="inputNome"
                                className="form-control"
                                name="inputNome"
                                value={nomeProduto}
                                onChange={((e:any) => setNomeProduto(e.target.value))}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-3">
                    <FormGroup htmlfor="inputNumeroRegistro" label="Número do registro">
                        <input type="number" 
                                id="inputNumeroRegistro"
                                className="form-control"
                                name="inputNumeroRegistro"
                                value={numeroRegistro}
                                onChange={((e:any) => setNumeroRegistro(e.target.value))}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-3">
                    <FormGroup htmlfor="inputFabricante" label="Fabricante">
                        <input type="text" 
                                id="inputFabricante"
                                className="form-control"
                                name="inputFabricante"
                                value={fabricante}
                                onChange={((e:any) => setFabricante(e.target.value))}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-3">
                    <FormGroup htmlfor="inputTipoProduto" label="Tipo do produto">
                        <input type="text" 
                                id="inputTipoProduto"
                                className="form-control"
                                name="inputTipoProduto"
                                value={tipoProduto}
                                onChange={((e:any) => setTipoProduto(e.target.value))}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup htmlfor="inputDescricao" label="Descrição do produto">
                        <textarea id="inputDescricao"
                                className="form-control"
                                name="inputDescricao"
                                value={descricao}
                                onChange={((e:any) => setDescricao(e.target.value))}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="mt-4">
                <button type="button" 
                    className="btn btn-info" 
                    onClick={cadastrarProduto}>
                    Cadastrar
                </button>
            </div>
        </Card>
    )
}