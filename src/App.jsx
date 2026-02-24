import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './pages/log/login'; // Sua tela de login
import HomePage from './pages/home/homePage'; // Sua tela do "Reddit"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App