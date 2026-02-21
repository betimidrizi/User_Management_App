import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  addUser,
  deleteUser
} from "../redux/usersSlice";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => dispatch(setUsers(data)));
    }
  }, [dispatch, users.length]);

  const handleAddUser = () => {
    if (!name || !email) {
      alert("Name and Email required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: "Local User" }
    };

    dispatch(addUser(newUser));
    setName("");
    setEmail("");
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TextField
        fullWidth
        label="Search users"
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add User */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddUser}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {/* Users */}
      <Grid container spacing={3}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {user.name}
                </Typography>

                <Typography>{user.email}</Typography>

                <Typography color="text.secondary">
                  {user.company?.name}
                </Typography>

                <Button
                  component={Link}
                  to={`/user/${user.id}`}
                  sx={{ mt: 1 }}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() =>
                    dispatch(deleteUser(user.id))
                  }
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserList;