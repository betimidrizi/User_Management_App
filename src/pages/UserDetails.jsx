import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/usersSlice";
import { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state =>
    state.users.list.find(u => u.id === Number(id))
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) return <h2>User not found</h2>;

  const handleUpdate = () => {
    const updatedUser = {
      ...user,
      name,
      email
    };

    dispatch(updateUser(updatedUser));
    navigate("/");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 5 }}>
      <CardContent>

        <Button onClick={() => navigate("/")}>
          Back
        </Button>

        <h2>Edit User</h2>

        <TextField
          fullWidth
          label="Name"
          value={name}
          sx={{ mb: 2 }}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          value={email}
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" onClick={handleUpdate}>
          Update User
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetails;