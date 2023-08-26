import { navBarItem } from "./models/navBarItem"

export default function NavBarItem(props: navBarItem){
    return(
        <li className="nav-item">
            <a className="nav-link" href={props.href}>{props.label}</a>
        </li>
    )
}