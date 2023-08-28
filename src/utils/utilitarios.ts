export default class utilitarios{

    converterObjetoEmString = (objeto: any) =>{
        var objetoConvertidoEmString = objeto.toString();

        return objetoConvertidoEmString;
    }

    converterStringEmObjetoFormatado = (dataEmString: any) =>{
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
                return '01';
            case "Feb":
                return '02';
            case "Mar":
                return '03';
            case "Apr":
                return '04';
            case "May":
                return '05';
            case "Jun":
                return '06';
            case "Jul":
                return '07';
            case "Aug":
                return '08';
            case "Sep":
                return '09';
            case "Oct":
                return '10';
            case "Nov":
                return '11';
            case "Dec":
                return '12';
            default:
                return null;
        }
    }
}