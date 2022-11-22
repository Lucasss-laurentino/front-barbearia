import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import http from '../../http';
import Barber from '../../interfaces/Barber';

interface Props {
    show: boolean,
    onHide: () => void,
    setBarbers: (barbers: Barber[]) => void,
}


export default function ModalCreateBarber({ show, onHide, setBarbers }: Props) {

    //  State to inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>();

    // State error on submit
    const [erroSendData, setErroSendData] = useState('');

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.files?.length) {

            setImage(event.target.files[0])
        
        } else {
        
            setImage(null)
        
        }

    }

    // Create barber
    const createBarber = () => {


        if(image && name){

            const data = new FormData();
        
            data.append('name', name);
            data.append('image', image)

            http.request({
                url: 'createBarber',
                method: 'POST',
                headers: {
                    'Content-Type': 'mulltipart/form-data'
                },
                data: data
            }).then((response) => {
                
                setName('');
                setImage(null);
                setErroSendData('')
                setBarbers([...response.data[1]]);
                onHide();
                
            })


        } else {
            setErroSendData('Erro ao cadastrar barbeiro, verifique se todos os campos foram preenchidos')
        }


    }

    return (

        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cadastre um barbeiro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='imagem-de-fundo mb-4' encType='multipart/form-data'>
                    <div className="form-group transparencia">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="email" value={name} onChange={(valor) => setName(valor.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu nome" />
                    </div>
                    <div className="form-group transparencia mt-3">
                        <label htmlFor="exampleFormControlFile1">Escolha uma imagem</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={selectImage} />
                    </div>
                    <button type="button" onClick={createBarber} className="btn btn-primary transparencia mt-3 w-100 transparencia-button">Cadastrar Barbeiro</button>
                </form>            
                <p className="text-danger my-3">{erroSendData}</p>
            </Modal.Body>
        </Modal>

    );

}

