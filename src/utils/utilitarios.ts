export default class utilitarios{

    converterObjetoEmString = (objeto: object) =>{
        var objetoConvertidoEmString = objeto.toString();

        return objetoConvertidoEmString;
    }

    converterStringEmObjetoFormatado = (dataEmString: string) =>{
        var objetoFormatado = dataEmString.split(" ");

        return objetoFormatado;
    }

    retornaNomeMes = (numeroMes:number) =>{
        switch(numeroMes){
            case 1:
                return "JANEIRO";
            case 2:
                return "FEVEREIRO"
            case 3:
                return "MARÇO"
            case 4:
                return "ABRIL"
            case 5:
                return "MAIO"
            case 6:
                return "JUNHO"
            case 7:
                return "JULHO"
            case 8:
                return "AGOSTO"
            case 9:
                return "SETEMBRO"
            case 10:
                return "OUTUBRO"
            case 11:
                return "NOVEMBRO"
            default:
                return "DEZEMBRO"
        }
    }

    retornarNumeroDoMes = (nomeMes:string) =>{
        switch(nomeMes){
            case "Jan":
                return 1;
            case "Feb":
                return 2;
            case "Mar":
                return 3;
            case "Apr":
                return 4;
            case "May":
                return 5;
            case "Jun":
                return 6;
            case "Jul":
                return 7;
            case "Aug":
                return 8;
            case "Sep":
                return 9;
            case "Oct":
                return 10;
            case "Nov":
                return 11;
            case "Dec":
                return 12;
            default:
                return null;
        }
    }
}