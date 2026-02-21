import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;