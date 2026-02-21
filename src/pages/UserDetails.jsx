import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Website: {user.website}</Typography>

        <Typography sx={{ marginTop: 2 }}>
          Address: {user.address.street}, {user.address.city}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetails;