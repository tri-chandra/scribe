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
              <Link to="/recordings">Recordings</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/recordings" element={<RecordingPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
