import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/usersSlice";
import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack
} from "@mui/material";

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
    dispatch(
      updateUser({
        ...user,
        name,
        email
      })
    );
    navigate("/");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 6 }}>
      <CardContent>
        <Stack spacing={2}>
          <Button onClick={() => navigate("/")}>
            Back
          </Button>

          <TextField
            label="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Update User
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserDetails;