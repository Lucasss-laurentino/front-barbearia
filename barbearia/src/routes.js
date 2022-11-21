import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/loginAndCreate';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/index' element={<Index/>} />
            </Routes>
        </Router>
    )
}