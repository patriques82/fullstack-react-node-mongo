import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./Users";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
