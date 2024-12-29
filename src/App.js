import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import HomePage from './ui/HomePage';
import RecordingPage from './ui/RecordingPage';

function App() {
  return (
    <>
      <h1>Scribe</h1>
      <Router>
        <div className="Content">
          <nav>
            <ul className="Nav">
              <li className="NavItem">
                <Link to="/">Record</Link>
              </li>
              <li className="NavItem">
                <Link to="/consultations">Consultations</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/consultations" element={<RecordingPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div >
      </Router>
    </>
  );
}

export default App;
