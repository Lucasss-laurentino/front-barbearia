import { useState } from 'react';
import http from '../../http';
import Barber from '../../interfaces/Barber';
import Hours from '../../interfaces/Hours';
import ModalCreateHour from '../ModalCreateHour';
import './Card.css';

interface Props {
    barbers: Barber[],
    hours: Hours[],
    setHours: (hours: Hours[]) => void,
    setHourReserved: (hourReserved: Hours) => void,
    setBarberReserved: (barberReserved: Barber) => void,
    setBarbers: (barbers: Barber[]) => void,
    setModalEditBarber: () => void,
    setBarberEdit: (barber: Barber) => void,
}

export default function Card({ barbers, hours, setHours, setHourReserved, setBarberReserved, setBarbers, setModalEditBarber, setBarberEdit}: Props) {



    // State to 'Modal create Hour'
    const [show, setShow] = useState(false);

    // State barber to send modal create hour
    const [barberId, setBarberId] = useState<undefined | number>()


    // Open Modal, send barber id
    const openModalAndSendBarberId = (barber_id: number) => {
        setBarberId(barber_id)
        setShow(true)
    }

    const reserve = (hourId: number) => {

        const userId = sessionStorage.getItem('user');

        http.put('reserve', { hourId, userId }).then((response) => {
            console.log(response)
            setHourReserved(response.data[0]);
            setHours([...response.data[1]]);
            setBarberReserved(response.data[2]);
        })
    }

    const deleteBarber = (barberId: number) => {
        http.delete('barberDelete/' + barberId).then((response) => {
            setBarbers([...response.data]);
        })
    }

   const openModalSendBarber = (barber: Barber) => {
        
        setBarberEdit(barber)
        setModalEditBarber()

   }

    return (

        <>
            <ModalCreateHour
                show={show}
                onHide={() => setShow(false)}
                barberId={barberId}
                setHours={(hours) => setHours(hours)}
            />

            <section className='container mx-2 d-flex p-0 w-100'>
                {barbers.map((barber) => {
                    return (
                        <div className="card cards-assets mt-3 mx-2" key={barber.id}>
                            <div className="d-flex bg-primary justify-content-end">
                                <button className='bg-primary text-danger border border-primary' onClick={() => deleteBarber(barber.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </button>

                                <button className="bg-primary text-white border border-primary" onClick={() => openModalSendBarber(barber)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="card-header bg-primary d-flex justify-content-around align-items-center">
                                <img className="card-img-fluid border rounded-circle" width='120' height='120' src={'http://127.0.0.1:8000/storage/' + barber.perfil} alt="Card image cap" />
                                <p className='m-0 text-white'>{barber.name}</p>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-center py-2">Horários</h5>

                                <ul className="list-group scroll">
                                    {hours.map((hour) => {
                                        if (hour.barber_id === barber.id && !hour.reserved) {
                                            return (
                                                <li className="list-group-item text-center ponteiro" key={hour.id} onClick={() => reserve(hour.id)} >{hour.time}</li>
                                            );
                                        }
                                    })}
                                </ul>

                                <button className='btn btn-sm bg-white w-100 my-3' onClick={() => openModalAndSendBarberId(barber.id)}>+Hora</button>

                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    )
}