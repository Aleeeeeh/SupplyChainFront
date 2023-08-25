import { useNavigate } from 'react-router-dom'

export default function LandingPage(){

    const navigate = useNavigate();
    const direcionaSistema = () =>{
        navigate('/cadastro-produto');
    }

    return(
        <button onClick={direcionaSistema}>Começar</button>
    )
}