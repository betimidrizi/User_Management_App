import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(4),
  animation: 'slideDown 0.5s ease-out',
  '@keyframes slideDown': {
    from: {
      transform: 'translateY(-100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(5px)',
  border: '2px solid rgba(255,255,255,0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

function DashboardHeader() {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ py: { xs: 1, sm: 2 } }}>
        <StyledAvatar>
          <PeopleAltIcon />
        </StyledAvatar>
        
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              background: 'linear-gradient(135deg, #fff 0%, #e0e0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 2s ease-in-out infinite',
              '@keyframes glow': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.8 },
              },
            }}
          >
            User Management Dashboard
          </Typography>
          
          <Typography 
            variant="subtitle2"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              display: { xs: 'none', sm: 'block' },
              animation: 'fadeIn 1s ease-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Manage your users efficiently
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default DashboardHeader;