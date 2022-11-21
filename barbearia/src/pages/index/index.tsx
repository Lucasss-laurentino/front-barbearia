import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import http from '../../http';
import './Index.css';

export default function Index() {

    useEffect(() => {
        http.get('index').then((resposta) => {
            console.log(resposta.data)
        }).catch(resposta => {
            console.log(resposta)
            //window.location.href='/';
        })
    }, []);

    return (

        <Navbar />

    );

}