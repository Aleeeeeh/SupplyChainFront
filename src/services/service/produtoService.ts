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

        if(Produto.numeroRegistro.toString().length < 9){
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

    validarMovimentacao(Mov:any){
        const erros = [];
        
        if(Mov.quantidade == "" || Mov.quantidade == null){
            erros.push("Favor informar a quantidade a ser movimentada");
        }

        if(Mov.local == "" || Mov.local == null){
            erros.push("Favor informar o local");
        }

        if(Mov.produtoID == "" || Mov.produtoID == null){
            erros.push("Favor informar o produto")
        }

        if(Mov.dataEHora == "" || Mov.dataEHora == null){
            erros.push("Favor informar data e hora")
        }

        if(erros && erros.length > 0){
            //@ts-ignore
            throw new ErroValidacao(erros);
        }
    }

    salvar(Produto:object){
       return this.post("",Produto);
    }

    entradaProduto(entrada:object){
        return this.post("/Entrada", entrada)
    }

    saidaProduto(entrada:object){
        return this.post("/Saida", entrada)
    }

    consultarProdutos(){
        return this.get("")
    }

    consultarEntradaProdutoMes(mes:string|null,ano:number,produtoID:object){
        return this.get(`/totalEntradaMesProduto?mes=${mes}&ProdutoID=${produtoID}&ano=${ano}`)
    }

    consultarSaidaProdutoMes(mes:string|null,ano:number,produtoID:object){
        return this.get(`/totalSaidaMesProduto?mes=${mes}&ProdutoID=${produtoID}&ano=${ano}`)
    }

    consultaEntradasMes(mes:string|null,ano:number){
        return this.get(`/filtroMesEntrada?mes=${mes}&ano=${ano}`)
    }

    consultaSaidasMes(mes:string|null,ano:number){
        return this.get(`/filtroMesSaida?mes=${mes}&ano=${ano}`)
    }
}