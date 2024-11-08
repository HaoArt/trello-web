import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useColorScheme } from '@mui/material';

function ButtonDarkLight() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  return (
    <Button
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      variant='contained'
    >
      {mode === 'light' ? (
        <DarkModeOutlinedIcon fontSize='small' style={{ marginRight: '5px' }} />
      ) : (
        <LightModeIcon fontSize='small' style={{ marginRight: '5px' }} />
      )}
      {mode === 'light' ? 'dark' : 'light'}
    </Button>
  );
}

export default ButtonDarkLight;
