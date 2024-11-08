import Box from '@mui/material/Box';

function BoardContent() {
  return (
    <Box
      sx={{
        with: '100%',
        backgroundColor: 'primary.light',
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Box Content
    </Box>
  );
}

export default BoardContent;
