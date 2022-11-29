import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from "yup";
import { useEffect, useState } from 'react';
import http from '../../http';
import './Login.css';
import imgLogin from './login.png';

// Config validate form
const schema = object({
    email: string().required("Campo obrigatório").email("Email inválido"),
    password: string().required("Campo obrigatório").min(6, "Precisa de pelo menos 6 caracteres"),
})

export default function Login() {

    // State inputs email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Errors
    const [errorEmail, setErrorEmail] = useState<any>();
    const [errorPassword, setErrorPassword] = useState<any>();

    // create user message
    const [createUserSuccess, setCreateUserSuccess] = useState(''); 
    const [createUserError, setCreateUserError] = useState('');

    // Login error message
    const [loginErro, setLoginErro] = useState('');

    // Yup
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});


    // Validando erros pelo use effect porques estava dando erro em renderizar "errors" direto no return
    useEffect(() => {

        if(errors?.email?.message){
            setErrorEmail(errors?.email?.message)
        } else {
            setErrorEmail('')
        }
    
        if(errors?.password?.message){
            setErrorPassword(errors?.password?.message)
        } else {
            setErrorPassword('')

        }
    
    
    }, [errors?.email, errors?.password])

    // Function to create user
    const createUser = (data: any) => {
                        
        http.post('createUser', {data}).then((response) => {

                reset();

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
    const login = (data: any) => {

        http.post('login', {data}).then((resposta) => {
            
            if(resposta.data === 'erro') {

                reset();

                setCreateUserError('');
                
                setCreateUserSuccess('');

                setLoginErro('Login incorreto');

            } else {

                sessionStorage.setItem('user', resposta.data[0].id)
                sessionStorage.setItem('adm', resposta.data[0].adm)
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
                <form onSubmit={handleSubmit(createUser)}>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Email"
                            {...register("email")}
                        />
                        <p className="text-danger mx-0 my-2">
                            {errorEmail}
                        </p>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Senha</label>
                        <input
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Senha"
                            {...register("password")}
                        />
                        <p className="text-danger mx-0 my-2">
                            {errorPassword}
                        </p>
                    </div>
                    <button type="button" className="btn btn-sm btn-primary my-2 w-100" onClick={handleSubmit(login)}>Conecte-se</button>
                    <button type="submit" className="btn btn-sm btn-primary my-2 w-100" >Cadastre-se</button>
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