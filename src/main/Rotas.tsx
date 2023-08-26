import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import CadastroProduto from '../views/CadastroProduto'
import MovimentacaoProdutosGrafico from '../views/MovimentacaoProdutosGrafico'
import RelatorioDeMovimentacaoProdutos from '../views/RelatorioDeMovimentacaoProdutos'

export default function Rotas()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/cadastro-produto' element={<CadastroProduto />} />
            <Route path='/movimentacao-produto-grafico' element={<MovimentacaoProdutosGrafico />} />
            <Route path='/relatorio-movimentacao-produto' element={<RelatorioDeMovimentacaoProdutos />} />
        </Routes>
    </BrowserRouter>
    )
}