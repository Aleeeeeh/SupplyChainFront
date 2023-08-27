import apiService from "../apiService";
import ErroValidacao from "../exceptions/erroValidacao";

export default class produtoService extends apiService{
    constructor(){
        super("/api/Produto")
    }

    validacaoCadastro(Produto:any){
        const erros = [];

        if(!Produto.nome){
            erros.push("Favor preencher o nome do produto");
        }

        if(Produto.numeroRegistro.length < 9){
            erros.push("Número de registro deve ter no minimo 9 dígitos");
        }

        if(!Produto.fabricante){
            erros.push("Favor preencher o nome do fabricante");
        }

        if(!Produto.tipoProduto){
            erros.push("Favor informar o tipo do produto");
        }

        if(!Produto.descricao){
            erros.push("Favor preencher a descrição do produto");
        }

        if(erros && erros.length > 0){
            //@ts-ignore
            throw new ErroValidacao(erros);
        }
    }

    salvar(Produto:object){
       return this.post("",Produto);
    }
}