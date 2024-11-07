import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';
import  Typography from '@mui/material/Typography';
function App() {
  return (
    <>
      <Typography variant='body2' color='text.secondary'>dark/light</Typography>
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
    </>
  );
}

export default App;
