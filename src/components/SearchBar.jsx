import { TextField, InputAdornment, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: '100%',
  transition: 'all 0.3s ease',
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
      transform: 'translateY(-2px)',
    },
    '&.Mui-focused': {
      boxShadow: '0 8px 40px rgba(102, 126, 234, 0.3)',
      transform: 'translateY(-2px)',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
    fontSize: '1rem',
  },
}));

const AnimatedIcon = styled('div')({
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
});

function SearchBar({ setSearch }) {
  const [localSearch, setLocalSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearch(value);
  };

  const handleClear = () => {
    setLocalSearch("");
    setSearch("");
  };

  return (
    <Fade in timeout={800}>
      <StyledTextField
        placeholder="Search users by name or email..."
        value={localSearch}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AnimatedIcon>
                <SearchIcon sx={{ color: '#667eea' }} />
              </AnimatedIcon>
            </InputAdornment>
          ),
          endAdornment: localSearch && (
            <InputAdornment position="end">
              <ClearIcon 
                onClick={handleClear}
                sx={{ 
                  cursor: 'pointer',
                  color: '#999',
                  '&:hover': { color: '#667eea', transform: 'rotate(90deg)' },
                  transition: 'all 0.3s ease',
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Fade>
  );
}

export default SearchBar;