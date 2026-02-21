import { Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import UserList from "./components/UserList";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">User Management App</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;