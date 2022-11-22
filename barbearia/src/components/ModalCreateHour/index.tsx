import './ModalCreateHour.css';
import Modal from 'react-bootstrap/Modal';
import http from '../../http';
import { useState } from 'react';
import Hours from '../../interfaces/Hours';

interface Props {
    show: boolean,
    onHide: () => void,
    barberId: undefined | number,
    setHours: (hours: Hours[]) => void,
}

export default function ModalCreateHour({ show, onHide, barberId, setHours }: Props) {

    // State to time
    const [time, setTime] = useState('');

    const createHour = () => {


        http.post('createHour', {time, barberId}).then((response) => {
            setHours([...response.data])
            setTime('')
            onHide()
        })
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
                    Cadastre um horário
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1"><strong>Hora</strong></label>
                        <input type="time" value={time} onChange={(time) => setTime(time.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={createHour} >Cadastrar Hora</button>
                </form>
            </Modal.Body>
        </Modal>
    );

}