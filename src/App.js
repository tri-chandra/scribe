import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import HomePage from './ui/HomePage'
import RecordingPage from './ui/RecordingPage'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Record</Link>
            </li>
            <li>
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
  );
}

export default App;
