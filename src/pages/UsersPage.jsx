import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Snackbar
} from "@mui/material";
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

  return (
    <>
      <DashboardHeader />

      <SearchBar setSearch={setSearch} />

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>

      <Grid container spacing={3}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={user}
              onDelete={(id) =>
                dispatch(deleteUser(id))
              }
            />
          </Grid>
        ))}
      </Grid>

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
      />
    </>
  );
}

export default UsersPage;