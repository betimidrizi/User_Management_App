import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/usersSlice";
import { useState } from "react"; // Add this import!
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  overflow: 'hidden',
}));

const HeaderGradient = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(3),
  color: 'white',
}));

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => 
    state.users.list.find(u => u.id === Number(id))
  );

  const [name, setName] = useState(user?.name || ""); // Fixed: setName, not setname
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          User not found
        </Typography>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const handleUpdate = () => {
    dispatch(
      updateUser({
        ...user,
        name: name, // Fixed: use name state, not setname
        email: email, // Fixed: use email state, not setEmail
      })
    );
    navigate("/");
  };

  return (
    <StyledCard sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <HeaderGradient>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              width: 56,
              height: 56
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Edit User
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              User ID: {id}
            </Typography>
          </Box>
        </Box>
      </HeaderGradient>

      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            type="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
              sx={{
                borderRadius: '10px',
                px: 3,
                py: 1
              }}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              onClick={handleUpdate}
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: '10px',
                px: 4,
                py: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                },
              }}
              disabled={!name || !email}
            >
              Save Changes
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

export default UserDetails;