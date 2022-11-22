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
}

export default function Card({ barbers, hours, setHours, setHourReserved }: Props) {

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

        http.put('reserve', {hourId, userId}).then((response) => {
            setHourReserved(response.data[0]);
            setHours([...response.data[1]]);
        })
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
                                                    <li className="list-group-item text-center" key={hour.id} onClick={() => reserve(hour.id)} >{hour.time}</li>
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