import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from "@mui/material";

function AddUserDialog({
  open,
  setOpen,
  name,
  setName,
  email,
  setEmail,
  handleAddUser
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New User</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          sx={{ mt: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          sx={{ mt: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;