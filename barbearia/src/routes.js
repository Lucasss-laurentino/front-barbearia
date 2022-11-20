import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </Router>
    )
}