import { Card, CardContent, Typography, Avatar, IconButton, Box, Chip, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transform: 'scaleX(0)',
    transition: 'transform 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
    '&::before': {
      transform: 'scaleX(1)',
    },
    '& .card-avatar': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'all 0.4s ease',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  marginBottom: theme.spacing(1),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 0),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
    '& .info-icon': {
      color: '#667eea',
    },
  },
}));

const AnimatedChip = styled(Chip)({
  animation: 'fadeInUp 0.6s ease-out',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

function UserCard({ user, onDelete }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Fade in timeout={500}>
      <StyledCard>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            mb: 2
          }}>
            <StyledAvatar className="card-avatar">
              {getInitials(user.name)}
            </StyledAvatar>
            
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#2d3748',
                mb: 0.5
              }}
            >
              {user.name}
            </Typography>
            
            <AnimatedChip 
              label={user.company?.name || "Company"}
              size="small"
              icon={<BusinessIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                color: '#667eea',
                fontWeight: 500,
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <InfoItem>
              <EmailIcon className="info-icon" sx={{ fontSize: 20, color: '#a0aec0' }} />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </InfoItem>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 1,
            mt: 2,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}>
            <IconButton 
              onClick={() => navigate(`/user/${user.id}`)}
              sx={{
                color: '#667eea',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)',
                  transform: 'rotate(5deg) scale(1.1)',
                },
              }}
            >
              <EditIcon />
            </IconButton>
            
            <IconButton 
              onClick={() => onDelete(user.id)}
              sx={{
                color: '#f56565',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(245, 101, 101, 0.1)',
                  transform: 'rotate(-5deg) scale(1.1)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>
    </Fade>
  );
}

export default UserCard;