import { useEffect, useState } from 'react';
import ModalCreateBarber from '../../components/ModalCreateBarber';
import Navbar from '../../components/Navbar';
import http from '../../http';
import './Index.css';
import Card from '../../components/Card';
import Barber from '../../interfaces/Barber';
import Hours from '../../interfaces/Hours';
import ModalHourReserved from '../../components/ModalHourReserved';
import ModalEditBarber from '../../components/ModalEditBarber';

export default function Index() {

    // Modal create barber
    const [show, setShow] = useState<boolean>(false);

    // Card barber
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [hours, setHours] = useState<Hours[]>([]);

    // Modal Hour Reserved
    const [modalHourReserved, setModalHourReserved] = useState(false);

    // Hour and barber reserved
    const [hourReserved, setHourReserved] = useState<undefined | Hours>();
    const [barberReserved, setBarberReserved] = useState<undefined | Barber>();

    // Pegando session storage que tem o id do user
    const userId = sessionStorage.getItem('user');


    useEffect(() => {

        http.get('index').then((response) => {
            setBarbers([...response.data[0]]);
            setHours([...response.data[1]]);
        
        }).catch(response => {
        
            window.location.href='/';
        
        })

        http.post('getHourReserved', {userId}).then((response) => {
            if(response.data.length != 0){
                setHourReserved(response.data[0]);
                setBarberReserved(response.data[1]);    
            } 
        })

    }, []);

    return (

    <>
    
        <ModalCreateBarber
            show={show} 
            onHide={() => setShow(false)}
            
            setBarbers={(barbers) => setBarbers(barbers)}
        />

        <ModalHourReserved 
            modalHourReserved={modalHourReserved} 
            setModalHourReserved={() => setModalHourReserved(false)}
        
            hourReserved={hourReserved}
            barberReserved={barberReserved}

            setHourReserved={() => setHourReserved(undefined)}
            setBarberReserved={() => setBarberReserved(undefined)}
            
            setHours={(hours) => setHours(hours)}
        />

        <Navbar 
            show={() => setShow(true)}
            setModalHourReserved={() => setModalHourReserved(true)}
        />

        <Card 
            barbers={barbers} 
            setBarbers={(barbers) => setBarbers(barbers)}
            hours={hours} 
            setHours={(hour) => setHours(hour)}
            setHourReserved={(hourReserved) => setHourReserved(hourReserved)}
            setBarberReserved={(barberReserved) => setBarberReserved(barberReserved)}
        />

    </>


    );

}