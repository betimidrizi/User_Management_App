import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>

      <Container>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;