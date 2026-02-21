import { Grid, TextField, Button, Paper } from "@mui/material";

function AddUserForm({
  name,
  email,
  setName,
  setEmail,
  handleAddUser
}) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
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
            Add User
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddUserForm;