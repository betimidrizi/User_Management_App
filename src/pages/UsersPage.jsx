import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Snackbar,
  Container,
  Fade,
  Box,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  addUser,
  deleteUser
} from "../redux/usersSlice";

import DashboardHeader from "../components/DashboardHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import AddUserDialog from "../components/AddUserDialog";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(6),
  minHeight: '100vh',
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1, 4),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
  },
}));

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => dispatch(setUsers(data)));
    }
  }, [dispatch, users.length]);

  const handleAddUser = () => {
    if (!name || !email) return;

    dispatch(
      addUser({
        id: Date.now(),
        name,
        email,
        company: { name: "Local User" }
      })
    );

    setOpen(false);
    setName("");
    setEmail("");
    setSnackbar(true);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Updated return statement with the new design
  return (
    <Fade in timeout={1000}>
      <div>
        <DashboardHeader />
        
        <StyledContainer maxWidth="lg">
          <SearchBar setSearch={setSearch} />

          <AddButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add New User
          </AddButton>

          <Grid container spacing={3}>
            {filteredUsers.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Fade in timeout={500 + (index * 100)}>
                  <div>
                    <UserCard
                      user={user}
                      onDelete={(id) => dispatch(deleteUser(id))}
                    />
                  </div>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {filteredUsers.length === 0 && (
            <Fade in>
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                animation: 'pulse 2s infinite',
              }}>
                <Typography variant="h6" color="text.secondary">
                  No users found matching your search
                </Typography>
              </Box>
            </Fade>
          )}

          <AddUserDialog
            open={open}
            setOpen={setOpen}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            handleAddUser={handleAddUser}
          />

          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            message="User added successfully"
            onClose={() => setSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
              '& .MuiSnackbarContent-root': {
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              },
            }}
          />
        </StyledContainer>
      </div>
    </Fade>
  );
}

export default UsersPage;