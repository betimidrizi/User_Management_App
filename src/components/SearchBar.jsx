import { TextField } from "@mui/material";

function SearchBar({ setSearch }) {
  return (
    <TextField
      fullWidth
      placeholder="Search users..."
      variant="outlined"
      sx={{ mb: 3 }}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;