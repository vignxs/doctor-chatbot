import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DoctorBotComponent } from './components/doctor-bot';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<DoctorBotComponent/>} />
      </Routes>
    </Router>
  )
}

export default App