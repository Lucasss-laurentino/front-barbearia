import Modal from 'react-bootstrap/Modal';
import http from '../../http';
import Barber from '../../interfaces/Barber';
import Hours from '../../interfaces/Hours';

interface Props {
    modalHourReserved: boolean,
    setModalHourReserved: () => void,
    hourReserved: undefined | Hours,
    barberReserved: undefined | Barber,
    setHourReserved: () => void,
    setBarberReserved: () => void,
    setHours: (hours: Hours[]) => void,
}

export default function ModalHourReserved({modalHourReserved, setModalHourReserved, hourReserved, barberReserved, setHourReserved, setBarberReserved, setHours}: Props) {
  
  // unmark
  const unmark = (hourId: number) => {

    http.put('unmark', {hourId}).then((response) => {
      setHourReserved();
      setBarberReserved();
      setModalHourReserved();
      setHours([...response.data]);
    })
  
  }
  
  return (
    <Modal
      show={modalHourReserved}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={setModalHourReserved}>
        <Modal.Title id="contained-modal-title-vcenter">
          Meu Horario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0">Hora Marcada: <strong>{hourReserved?.time}</strong></p>
        <p className="m-0">Barbeiro Marcado:  <strong>{barberReserved?.name}</strong></p>
      </Modal.Body>
      <Modal.Footer>
          {hourReserved?.reserved ? <button className="btn btn-sm btn-danger w-100" onClick={() => unmark(hourReserved?.id)}><strong>Desmarcar</strong></button> : '' }
      </Modal.Footer>
    </Modal>
  );
}