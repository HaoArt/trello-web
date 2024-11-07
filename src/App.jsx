import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
function App() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  return (
    <>
      <Typography variant='body2' color='text.secondary'>
        dark/light
      </Typography>
      <Button variant='contained'>Hello world</Button>
      <Button variant='text'>
        Hello world <ThreeDRotation />
      </Button>
      <Button variant='outlined'>
        Hello world <AccessAlarm />
      </Button>
      <HomeIcon />
      <HomeIcon color='primary' />
      <HomeIcon color='secondary' />
      <HomeIcon color='success' />
      <HomeIcon color='action' />
      <HomeIcon color='disabled' />
      <HomeIcon sx={{ color: pink[500] }} />
      <>
        <Button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          variant='contained'
        >
          {mode === 'light' ? (
            <DarkModeOutlinedIcon
              fontSize='small'
              style={{ marginRight: '5px' }}
            />
          ) : (
            <LightModeIcon fontSize='small' style={{ marginRight: '5px' }} />
          )}
          {mode === 'light' ? 'dark' : 'light'}
        </Button>
      </>
    </>
  );
}

export default App;
