import { useState } from 'react';
import http from '../../http';
import './Login.css';
import imgLogin from './login.png';

export default function Login() {

    // State inputs email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // create user message
    const [createUserSuccess, setCreateUserSuccess] = useState(''); 
    const [createUserError, setCreateUserError] = useState('');

    // Login message
    const [loginErro, setLoginErro] = useState('');

    // Function to create user
    const createUser = () => {
        
        http.post('createUser', {email, password}).then((resposta) => {

                setEmail('');
            
                setPassword('');

                setCreateUserError('');
                
                setCreateUserSuccess('Usuário criado com sucesso !');
            
        }).catch(resposta => {

            setEmail('');
            
            setPassword('');
            
            setCreateUserSuccess('');

            setCreateUserError('Erro ao se cadastrar !');
        })  
    }

    // Login function
    const login = () => {

        http.post('login', {email, password}).then((resposta) => {
            
            if(resposta.data === 'erro') {

                setCreateUserError('');
                
                setCreateUserSuccess('');

                setLoginErro('Login incorreto');

            } else {

                sessionStorage.setItem('user', resposta.data[0])
                sessionStorage.setItem('token', resposta.data[1])

                window.location.href='/index'

            }
            
        })
    
    }

    return (
        <main className='size d-flex align-items-center'>

            <div className="container logo">
                <img className='' src={imgLogin} width='80%' height='70%' alt="" />
            </div>

            <div className="container formulario">
                <div className="container">
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
                    <button type="button" className="btn btn-sm btn-primary my-2 w-100" onClick={login}>Conecte-se</button>
                    <button type="button" className="btn btn-sm btn-primary my-2 w-100" onClick={createUser}>Cadastre-se</button>
                </form>
                </div>

                <div className="container fixed-top mt-5 pt-5">
                    <p className='d-flex justify-content-center h5 text-success mx-0 my-3'>{createUserSuccess}</p>
                    <p className='d-flex justify-content-center h5 text-danger mx-0 my-3'>{createUserError}</p>
                    <p className='d-flex justify-content-center h5 text-danger mx-0 my-3'>{loginErro}</p>
                </div>

            </div>

        </main>
    )
}