import { useState } from 'react';
import './Login.css';
import imgLogin from './login.png';

export default function Login() {

    // Estados de inputs email e senha
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <main className='size d-flex align-items-center'>

            <div className="container logo">
                <img className='' src={imgLogin} width='80%' height='70%' alt="" />
            </div>

            <div className="container formulario">
                <form>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input 
                            value={email}
                            onChange={(valor) => setEmail(valor.target.value)}
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Senha</label>
                        <input
                            value={password}
                            onChange={(valor) => setPassword(valor.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Senha" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-2 w-100">Conecte-se</button>
                    <button type="submit" className="btn btn-primary my-2 w-100">Cadastre-se</button>
                </form>
            </div>

        </main>
    )
}