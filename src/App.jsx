import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';

function App() {
  return (
    <>
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
