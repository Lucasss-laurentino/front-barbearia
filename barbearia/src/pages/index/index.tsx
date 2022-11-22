import { useEffect, useState } from 'react';
import ModalCreateBarber from '../../components/ModalCreateBarber';
import Navbar from '../../components/Navbar';
import http from '../../http';
import './Index.css';

export default function Index() {

    // Modal create barber
    const [show, setShow] = useState<boolean>(false);
    

    useEffect(() => {

        http.get('index').then((resposta) => {
        
            console.log(resposta.data)
        
        }).catch(resposta => {
        
            window.location.href='/';
        
        })
    }, []);

    return (



    <>
        <ModalCreateBarber show={show} onHide={() => setShow(false)} />
        <Navbar show={() => setShow(true)} />
    </>

    );

}