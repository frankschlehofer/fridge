import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FridgePage from './pages/FridgePage'
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';


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
        <Route
          path='/signup'
          element={<SignUpPage />}
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
