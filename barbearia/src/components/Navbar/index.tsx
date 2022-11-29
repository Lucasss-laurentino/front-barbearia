import { useEffect } from 'react';
import './Navbar.css';

interface Props {
    show: () => void,
    setModalHourReserved: () => void,
}
export default function Navbar({show, setModalHourReserved}: Props) {

    // Logout
    const logout = () => {
        sessionStorage.setItem('token', '');
        window.location.href='/'
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-primary bg-primary">
            <a className="navbar-brand mx-3 text-white" href="#"><strong>Barbearia</strong></a>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            
                <span className="navbar-toggler-icon"></span>
            
            </button>

            <div className="collapse navbar-collapse justify-content-end mx-2" id="navbarSupportedContent">
            
                <ul className="navbar-nav mr-auto">
            
                    <li className="nav-item">
            
                        <button className="nav-link bg-primary border border-primary text-white" onClick={setModalHourReserved}>Meu Horário</button>
            
                    </li>
            
                    <li className="nav-item">

                    {sessionStorage.getItem('adm') === '1' ? <button className="nav-link bg-primary border border-primary text-white" onClick={show}>+Barbeiro</button> : ''}
            
                    </li>
            
                    <li className="nav-item">
            
                        <button className="nav-link text-white bg-primary border border-primary" onClick={logout}>Sair</button>
            
                    </li>
            
                </ul>
            
            </div>

        </nav>
    )
}