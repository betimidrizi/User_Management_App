import { Card, CardContent, Typography, Avatar, IconButton, Box, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  background: '#ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 30px rgba(102, 126, 234, 0.1)',
    borderColor: '#667eea40',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontSize: '1.2rem',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 0),
  '& svg': {
    fontSize: '1.1rem',
    color: '#a0aec0',
  },
  '&:hover svg': {
    color: '#667eea',
  },
}));

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
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2,
          mb: 2
        }}>
          <StyledAvatar>
            {getInitials(user.name)}
          </StyledAvatar>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                color: '#2d3748',
                mb: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.name}
            </Typography>
            
            <Chip 
              label={user.company?.name || "Company"}
              size="small"
              icon={<BusinessIcon sx={{ fontSize: '0.8rem !important' }} />}
              sx={{
                background: '#f7fafc',
                color: '#4a5568',
                height: 24,
                '& .MuiChip-label': { fontSize: '0.7rem', px: 1 },
                '& .MuiChip-icon': { fontSize: '0.8rem', ml: 0.5 }
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <InfoItem>
            <EmailIcon />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
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
          borderTop: '1px solid #edf2f7'
        }}>
          <Tooltip title="Edit user">
            <IconButton 
              onClick={() => navigate(`/user/${user.id}`)}
              size="small"
              sx={{
                color: '#667eea',
                '&:hover': {
                  background: '#667eea10',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete user">
            <IconButton 
              onClick={() => onDelete(user.id)}
              size="small"
              sx={{
                color: '#f56565',
                '&:hover': {
                  background: '#f5656510',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default UserCard;