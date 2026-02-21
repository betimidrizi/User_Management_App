import { Card, CardContent, Typography, Avatar, IconButton, Box, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  background: '#ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '220px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 30px rgba(102, 126, 234, 0.1)',
    borderColor: '#667eea40',
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 45,
  height: 45,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontSize: '1rem',
  fontWeight: 600,
  flexShrink: 0,
}));

const UserInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
});

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.8),
  '& svg': {
    fontSize: '1rem',
    color: '#a0aec0',
    flexShrink: 0,
  },
  '& .info-text': {
    fontSize: '0.85rem',
    color: '#4a5568',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const CompanyChip = styled(Chip)({
  height: 22,
  '& .MuiChip-label': {
    fontSize: '0.7rem',
    padding: '0 8px',
  },
  '& .MuiChip-icon': {
    fontSize: '0.8rem',
    marginLeft: '4px',
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

  // Handle both API and local users
  const companyName = user.company?.name || "Local User";
  const companyNameShort = companyName.length > 15 
    ? companyName.substring(0, 12) + '...' 
    : companyName;

  return (
    <StyledCard>
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader>
          <StyledAvatar>{getInitials(user.name)}</StyledAvatar>
          <UserInfo>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                color: '#2d3748',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.name}
            </Typography>
            <CompanyChip
              icon={<ApartmentIcon />}
              label={companyNameShort}
              size="small"
              sx={{
                background: '#f7fafc',
                color: '#4a5568',
                maxWidth: '140px',
              }}
            />
          </UserInfo>
        </CardHeader>

        <Box sx={{ flex: 1 }}>
          <InfoRow>
            <EmailIcon />
            <Typography className="info-text" title={user.email}>
              {user.email}
            </Typography>
          </InfoRow>
          
          {/* Show company catchPhrase if available (from API) */}
          {user.company?.catchPhrase && (
            <InfoRow>
              <BusinessIcon />
              <Typography className="info-text" title={user.company.catchPhrase}>
                "{user.company.catchPhrase.substring(0, 20)}..."
              </Typography>
            </InfoRow>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 0.5,
          mt: 'auto',
          pt: 1,
          borderTop: '1px solid #edf2f7'
        }}>
          <Tooltip title="View & Edit Details">
            <IconButton 
              onClick={() => navigate(`/user/${user.id}`)}
              size="small"
              sx={{ color: '#667eea' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton 
              onClick={() => onDelete(user.id)}
              size="small"
              sx={{ color: '#f56565' }}
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