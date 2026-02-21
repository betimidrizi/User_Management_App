import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg,#2563eb,#4f46e5)"
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <PeopleIcon />
          <Typography variant="h6" fontWeight="bold">
            Users Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;