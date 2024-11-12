import Box from '@mui/material/Box';
import ButtonDarkLight from '~/components/ModeSelect/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import TrelloLogo from '~/assets/trello.svg?react';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Workspaces from './menus/Workspaces';
import Recent from './menus/Recent';
import InputAdornment from '@mui/material/InputAdornment';
import Started from './menus/Started';
import Templates from './menus/Templates';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Profile from './menus/Profile';
function AppBar() {
  return (
    <Box
      sx={{
        with: '100%',
        height: (theme) => theme.trello.appBarHeight,
        paddingX: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            fontSize='small'
            sx={{ color: 'primary.main' }}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Trello
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Workspaces />
            <Recent />
            <Started />
            <Templates />
            <Button variant='outlined' startIcon={<LibraryAddIcon />}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='search'
          size='small'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ minWidth: '120px' }}
        />
        <ButtonDarkLight />

        <Tooltip title='Notification'>
          <Badge
            badgeContent={4}
            color='secondary'
            // variant='dot'
            sx={{ cursor: 'pointer' }}
          >
            <NotificationsNoneIcon color='primary' />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon color='primary' />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
