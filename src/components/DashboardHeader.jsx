import { Box, Typography } from "@mui/material";

function DashboardHeader() {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        mb: 4,
        color: "white",
        background:
          "linear-gradient(135deg,#6366f1,#3b82f6,#06b6d4)"
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        User Management System
      </Typography>
      <Typography>
        Manage users, search, update and organize easily
      </Typography>
    </Box>
  );
}

export default DashboardHeader;