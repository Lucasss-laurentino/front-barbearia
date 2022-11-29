import './Modal.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from 'yup';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import http from '../../http';
import Barber from '../../interfaces/Barber';

interface Props {
    show: boolean,
    onHide: () => void,
    setBarbers: (barbers: Barber[]) => void,
}

const schema = object({
    name: string().required("Campo obrigatório").min(3, "Nome muito curto"),
})

export default function ModalCreateBarber({ show, onHide, setBarbers }: Props) {

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const [errorName, setErrorName] = useState<any>();
    
    useEffect(() => {

        if(errors?.name?.message) {
            setErrorName(errors?.name?.message);
        } else {
            setErrorName('');
        }


    }, [errors?.name?.message])

    //  State to input file    
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

    const createBarber = (dataForm: any) => {

        if (image && dataForm.name) {

            const data = new FormData();

            data.append('name', dataForm?.name);
            data.append('image', image)

            http.request({
                url: 'createBarber',
                method: 'POST',
                headers: {
                    'Content-Type': 'mulltipart/form-data'
                },
                data: data
            }).then((response) => {

                setImage(null);
                setErroSendData('')
                setBarbers([...response.data[1]]);
                reset();
                onHide();

            })


        } else {
            setErroSendData('Erro ao cadastrar barbeiro, verifique se todos os campos foram preenchidos')
        }

    }

    const cleanAndOnHide = () => {
        reset();
        onHide();
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
                    {'Cadastre um barbeiro'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='imagem-de-fundo mb-4' onSubmit={handleSubmit(createBarber)}>
                    <div className="form-group transparencia">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Seu nome" 
                            {...register("name")}
                        />
                        <p className="text-danger mx-0 my-2">
                            {errorName}
                        </p>
                    </div>
                    <div className="form-group transparencia mt-3">
                        <label htmlFor="exampleFormControlFile1">Escolha uma imagem</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="form-control-file" 
                            id="exampleFormControlFile1" 
                            onChange={selectImage} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary transparencia mt-3 w-100 transparencia-button">Cadastrar Barbeiro</button>
                </form>
                <p className="text-danger my-3">{erroSendData}</p>
            </Modal.Body>
        </Modal>

    );

}

