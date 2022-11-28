import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import http from '../../http';
import Barber from '../../interfaces/Barber';
import './ModalEditBarber.css';

interface Props {
    modalEditBarber: boolean,
    setModalEditBarber: () => void,
    barberEdit: Barber | undefined
}

export default function ModalEditBarber({modalEditBarber, setModalEditBarber, barberEdit}: Props) {

    const [name, setName] = useState(''); // Colocar nome do barbeiro nesse state
    const [image, setImage] = useState<File | null>();
    const [erroSendData, setErroSendData] = useState('');


    const selectFile = (file: React.ChangeEvent<HTMLInputElement>) => {

        // verify if object is null
        if(file.target.files?.length){
            setImage(file.target.files[0]);
        } else {
            setImage(null);
        }

    }

    const editBarber = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();


    }

    return (
        <Modal
        show={modalEditBarber}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton onHide={setModalEditBarber}>
            <Modal.Title id="contained-modal-title-vcenter">
                Editar barbeiro
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form 
                className='imagem-de-fundo mb-4' 
                encType='multipart/form-data' 
                onSubmit={editBarber}>
                
                <div className="form-group transparencia">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="email" value={barberEdit?.name} onChange={(valor) => setName(valor.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu nome" />
                </div>
                <div className="form-group transparencia mt-3">
                    <label htmlFor="exampleFormControlFile1">Escolha uma imagem</label>
                    <input type="file" onChange={(file) => selectFile(file)} className="form-control-file" id="exampleFormControlFile1" />
                </div>
                <button type="submit" className="btn btn-primary transparencia mt-3 w-100 transparencia-button">Cadastrar Barbeiro</button>
            </form>            
            <p className="text-danger my-3">{erroSendData}</p>
        </Modal.Body>
    </Modal>

    )
}