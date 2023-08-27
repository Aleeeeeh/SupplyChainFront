import axios from "axios";
import { BASE_URL } from "../utils/request";

const httpClient = axios.create({
    baseURL: BASE_URL
})

export default class apiService{
    apiUrl:string;

    constructor(apiUrl:string){
        this.apiUrl = apiUrl
    }

    post(url: string, objeto: object){
        const requestURL = `${this.apiUrl}${url}`
        console.log(requestURL)
        console.log(objeto)
        return httpClient.post(requestURL, objeto);
    }

    put(url: string, objeto: string){
        const requestURL = `${this.apiUrl}${url}`
        return httpClient.put(requestURL, objeto);
    }

    delete(url: string){
        const requestURL = `${this.apiUrl}${url}`
        return httpClient.delete(requestURL);
    }

    get(url: string){
        const requestURL = `${this.apiUrl}${url}`
        return httpClient.get(requestURL);
    }
}