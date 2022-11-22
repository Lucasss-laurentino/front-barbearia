import { useEffect, useState } from 'react';
import ModalCreateBarber from '../../components/ModalCreateBarber';
import Navbar from '../../components/Navbar';
import http from '../../http';
import './Index.css';
import Card from '../../components/Card';
import Barber from '../../interfaces/Barber';
import Hours from '../../interfaces/Hours';

export default function Index() {

    // Modal create barber
    const [show, setShow] = useState<boolean>(false);

    // Card barber
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [hours, setHours] = useState<Hours[]>([]);

    // Hour reserved
    const [hourReserved, setHourReserved] = useState<undefined | Hours>();


    useEffect(() => {

        http.get('index').then((response) => {
            setBarbers([...response.data[0]]);
            setHours([...response.data[1]]);
        
        }).catch(response => {
        
            window.location.href='/';
        
        })
    }, []);

    console.log(hourReserved)

    return (

    <>
    
        <ModalCreateBarber
            show={show} 
            onHide={() => setShow(false)}
            
            setBarbers={(barbers) => setBarbers(barbers)}
        />
        
        <Navbar show={() => setShow(true)} />

        <Card 
            barbers={barbers} 
            hours={hours} 
            setHours={(hour) => setHours(hour)}
            setHourReserved={(hourReserved) => setHourReserved(hourReserved)}
        />

    </>


    );

}