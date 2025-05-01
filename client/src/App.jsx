import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FridgePage from './components/FridgePage'
import LandingPage from './components/LandingPage';


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route 
          path='/fridgepage'
          element={<FridgePage />}
        />
        <Route
          path='/'
          element={<LandingPage />}
        />
      </Routes>
      <Link to='/fridgepage'>
        <button style={{color:'blue'}}>FridgePage</button>
      </Link>
      <Link to='/'>
        <button style={{color:'blue'}}>Landing</button>
      </Link>
    </Router>
    </div>
  )
}

export default App;
