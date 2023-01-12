import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Single from "./pages/Single/Single"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<List type="hotels"/>} />
      <Route path="/hotels/:id" element={<Single type="hotels" />} />
      <Route path="/flights" element={<List type="flights"/>} />
      <Route path="/flights/:id" element={<Single type="flights"/>} />
      <Route path="/cars" element={<List type="cars"/>} />
      <Route path="/cars/:id" element={<Single type="cars" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
