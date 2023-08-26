import Rotas from './main/Rotas'
import NavBar from './componentes/NavBar'
import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './custom.css'

export default function App() {

  return (
    <>
      <div className='container'>
        <NavBar />
        <Rotas />
      </div>
    </>
  )
}


