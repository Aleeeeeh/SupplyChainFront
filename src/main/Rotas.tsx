import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import CadastroProduto from '../views/CadastroProduto'

export default function Rotas()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/cadastro-produto' element={<CadastroProduto />} />
        </Routes>
    </BrowserRouter>
    )
}