import React from "react"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  Box,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '30px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
    boxShadow: '0 25px 50px -12px rgba(102, 126, 234, 0.5)',
    animation: 'popIn 0.4s ease-out',
    '@keyframes popIn': {
      '0%': {
        opacity: 0,
        transform: 'scale(0.8) translateY(20px)',
      },
      '100%': {
        opacity: 1,
        transform: 'scale(1) translateY(0)',
      },
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  textAlign: 'center',
  paddingTop: '32px',
  '& h2': {
    fontSize: '1.8rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.1)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
    },
  },
});

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
    <StyledDialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
            borderRadius: '50%',
            p: 2,
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}>
            <PersonAddIcon sx={{ fontSize: 50, color: '#667eea' }} />
          </Box>
        </Box>
        Add New User
      </StyledDialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <StyledTextField
            autoFocus
            label="Full Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user's full name"
          />
          
          <StyledTextField
            label="Email Address"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email"
            type="email"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          startIcon={<CloseIcon />}
          sx={{
            borderRadius: '50px',
            px: 3,
            borderColor: '#e2e8f0',
            color: '#718096',
            '&:hover': {
              borderColor: '#cbd5e0',
              background: '#f7fafc',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleAddUser}
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            borderRadius: '50px',
            px: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
            },
            '&:disabled': {
              background: '#e2e8f0',
            },
            transition: 'all 0.3s ease',
          }}
          disabled={!name || !email}
        >
          Add User
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AddUserDialog;