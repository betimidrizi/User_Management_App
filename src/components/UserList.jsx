import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = () => {
    if (!name || !email) return alert("Name and Email required");

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: "Local User" }
    };

    setUsers([newUser, ...users]);
    setName("");
    setEmail("");
  };

  const filteredUsers = users
    .filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <>
      <TextField
        fullWidth
        label="Search users..."
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ marginBottom: 3 }}
        onClick={() => setSortAsc(!sortAsc)}
      >
        Sort
      </Button>

      {/* Add User Form */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
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
          <Button fullWidth variant="contained" onClick={addUser}>
            Add
          </Button>
        </Grid>
      </Grid>

      {/* Users Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography>{user.email}</Typography>
                <Typography color="text.secondary">
                  {user.company?.name}
                </Typography>

                <Button
                  component={Link}
                  to={`/user/${user.id}`}
                  sx={{ marginTop: 2 }}
                >
                  View Details
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