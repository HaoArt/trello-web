import Box from '@mui/material/Box';

function BoardBar() {
  return (
    <Box
      sx={{
        with: '100%',
        backgroundColor: 'primary.dark',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Box Bar
    </Box>
  );
}

export default BoardBar;
