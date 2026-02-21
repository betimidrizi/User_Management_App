import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Snackbar,
  Container,
  Fade,
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  addUser,
  deleteUser
} from "../redux/usersSlice";

import DashboardHeader from "../components/DashboardHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import AddUserDialog from "../components/AddUserDialog";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(6),
  minHeight: '100vh',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'all 0.3s ease',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 10px 20px rgba(102, 126, 234, 0.2)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1.2, 2),
  },
}));

const ResultsInfo = styled(Typography)(({ theme }) => ({
  color: '#718096',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}));

const SortContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const SortButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  borderColor: '#e2e8f0',
  color: '#4a5568',
  '&:hover': {
    borderColor: '#667eea',
    background: '#f7fafc',
  },
}));

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Sorting states
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const openSort = Boolean(sortAnchorEl);

  useEffect(() => {
    if (users.length === 0) {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
          dispatch(setUsers(data));
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });
    }
  }, [dispatch, users.length]);

  const handleAddUser = () => {
    if (!name || !email) return;

    dispatch(
      addUser({
        id: Date.now(),
        name,
        email,
        company: { name: "Local User" }
      })
    );

    setOpen(false);
    setName("");
    setEmail("");
    setSnackbar(true);
  };

  // Sorting function
  const sortUsers = (usersToSort) => {
    return [...usersToSort].sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'company':
          aValue = a.company?.name?.toLowerCase() || '';
          bValue = b.company?.name?.toLowerCase() || '';
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const filteredAndSortedUsers = sortUsers(
    users.filter(
      user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Fade in timeout={800}>
      <div>
        <DashboardHeader />
        
        <StyledContainer maxWidth="xl">
          {/* Header with stats and add button */}
          <HeaderSection>
            <StatsCard elevation={0}>
              <PeopleAltIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Users
                </Typography>
              </Box>
            </StatsCard>

            <AddButton
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setOpen(true)}
              size="large"
            >
              Add New User
            </AddButton>
          </HeaderSection>

          {/* Search bar */}
          <SearchBar setSearch={setSearch} />

          {/* Sorting Controls */}
          <SortContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SortButton
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={(e) => setSortAnchorEl(e.currentTarget)}
              >
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </SortButton>
              
              <IconButton
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                sx={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  color: '#667eea',
                  '&:hover': {
                    background: '#f7fafc',
                  },
                }}
                size="small"
              >
                {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              {filteredAndSortedUsers.length} user{filteredAndSortedUsers.length !== 1 ? 's' : ''}
            </Typography>
          </SortContainer>

          <Menu
            anchorEl={sortAnchorEl}
            open={openSort}
            onClose={() => setSortAnchorEl(null)}
          >
            <MenuItem 
              onClick={() => { setSortBy('name'); setSortAnchorEl(null); }}
              selected={sortBy === 'name'}
            >
              Name
            </MenuItem>
            <MenuItem 
              onClick={() => { setSortBy('email'); setSortAnchorEl(null); }}
              selected={sortBy === 'email'}
            >
              Email
            </MenuItem>
            <MenuItem 
              onClick={() => { setSortBy('company'); setSortAnchorEl(null); }}
              selected={sortBy === 'company'}
            >
              Company
            </MenuItem>
          </Menu>

          {/* Results info */}
          {search && (
            <ResultsInfo>
              Found {filteredAndSortedUsers.length} user{filteredAndSortedUsers.length !== 1 ? 's' : ''} matching "{search}"
            </ResultsInfo>
          )}

          {/* Loading state */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <Typography color="text.secondary">Loading users...</Typography>
            </Box>
          ) : (
            <>
              {/* Users grid */}
              <Grid container spacing={3}>
                {filteredAndSortedUsers.map((user, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                    <Fade in timeout={500 + (index * 100)}>
                      <div>
                        <UserCard
                          user={user}
                          onDelete={(id) => dispatch(deleteUser(id))}
                        />
                      </div>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              {/* Empty state */}
              {filteredAndSortedUsers.length === 0 && !loading && (
                <Fade in>
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                  }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No users found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or add a new user
                    </Typography>
                  </Box>
                </Fade>
              )}
            </>
          )}

          <AddUserDialog
            open={open}
            setOpen={setOpen}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            handleAddUser={handleAddUser}
          />

          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            message="User added successfully"
            onClose={() => setSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
              '& .MuiSnackbarContent-root': {
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                fontWeight: 500,
              },
            }}
          />
        </StyledContainer>
      </div>
    </Fade>
  );
}

export default UsersPage;