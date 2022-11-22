import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import http from '../../http';

interface Props {
    show: boolean,
    onHide: () => void,
}


export default function ModalCreateBarber({ show, onHide }: Props) {

    //  State to inputs
    const [name, setName] = useState('');

    // Create barber
    const createBarber = () => {
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
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <button type="button" onClick={createBarber} className="btn btn-primary transparencia mt-3 w-100 transparencia-button">Cadastrar Barbeiro</button>
                </form>            
            </Modal.Body>
        </Modal>

    );

}

