import logo from './logo.svg';
import './App.css';

import Cadastro from "./components/Cadastro"
import FormularioCadastro from "./components/FormularioCadastro"

function App() {
  return (
    <div className="row">
      <div className='col-md-8 offset-md-2'>
        <Cadastro />
      </div>
    </div>
  );
}

export default App;
