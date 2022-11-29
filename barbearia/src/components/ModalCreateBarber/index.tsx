import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import http from '../../http';
import Barber from '../../interfaces/Barber';

interface Props {
    show: boolean,
    onHide: () => void,
    setBarbers: (barbers: Barber[]) => void,
    barberEdit: Barber | undefined,
    setBarberEdit: (barber: Barber | undefined) => void,

}


export default function ModalCreateBarber({ show, barberEdit, onHide, setBarbers, setBarberEdit }: Props) {

    useEffect(() => {

        if(barberEdit){
            setName(barberEdit.name)
        }

    }, [barberEdit])

    //  State to inputs
    const [name, setName] = useState<string>('');
    
    const [image, setImage] = useState<File | null>();


    // State error on submit
    const [erroSendData, setErroSendData] = useState('');

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files?.length) {

            setImage(event.target.files[0])

        } else {

            setImage(null)

        }

    }

    // Create barber or edit
    const createBarberOrEdit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (barberEdit) {

            if(image && name) {
                
                const formData = new FormData();

                formData.append('name', name);
                formData.append('image', image);
                formData.append('id', JSON.stringify(barberEdit.id));

                http.request({
                    
                    url: 'editBarber',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData

                }).then((response) => {
                    setBarberEdit(response.data[0]);
                    setBarbers([...response.data[1]]);
                    onHide();
                })
            
            }


        } else {

            if (image && name) {

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


    }

    const cleanAndOnHide = () => {
        onHide();
        setBarberEdit(undefined);
        setName('')
    }

    return (

        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={cleanAndOnHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {barberEdit ? 'Editar barbeiro' : 'Cadastre um barbeiro'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='imagem-de-fundo mb-4' onSubmit={createBarberOrEdit}>
                    <div className="form-group transparencia">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" value={name} onChange={(valor) => setName(valor.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu nome" />
                    </div>
                    <div className="form-group transparencia mt-3">
                        <label htmlFor="exampleFormControlFile1">Escolha uma imagem</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={selectImage} />
                    </div>
                    <button type="submit" className="btn btn-primary transparencia mt-3 w-100 transparencia-button">Cadastrar Barbeiro</button>
                </form>
                <p className="text-danger my-3">{erroSendData}</p>
            </Modal.Body>
        </Modal>

    );

}

