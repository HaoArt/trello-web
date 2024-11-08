import Box from '@mui/material/Box';
import ButtonDarkLight from '../../components/ModeSelect';

function AppBar() {
  return (
    <Box
    sx={{
      with: '100%',
      backgroundColor: 'primary.light',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <ButtonDarkLight />
  </Box>
  )
}

export default AppBar