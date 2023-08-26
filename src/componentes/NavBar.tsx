import NavBarItem from "./NavBarItem";

export default function NavBar(){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <div className="Marca">
                    <a href="/" className="navbar-brand">MStarSupply</a>
                </div>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem href="/" label="Home" />
                        <NavBarItem href="/cadastro-produto" label="Cadastro" />
                        <NavBarItem href="/movimentacao-produto-grafico" label="Gráfico" />
                        <NavBarItem href="/relatorio-movimentacao-produto" label="Relatório" />
                    </ul>
                </div>
            </div>
        </div>
    )
}