import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";
import { Link } from "react-router-dom";

function UserCard({ user, onDelete }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>

        <Typography>{user.email}</Typography>

        <Typography color="text.secondary">
          {user.company?.name}
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/user/${user.id}`}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;