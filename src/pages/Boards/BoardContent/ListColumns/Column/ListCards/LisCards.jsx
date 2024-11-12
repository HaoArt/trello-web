/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from './Card/Card';

function LisCards({ cards }) {
  return (
    <Box
      sx={{
        p: '0 6px 4px',
        m: '0 3px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(7)} - ${
            theme.trello.columnHeaderHeight
          } - ${theme.trello.columnFooterHeight})`,
        '&::-webkit-scrollbar': {
          // display: 'none',
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#e8e6e6',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'text.color',
          borderRadius: '8px',
        },
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card}/>
      ))}
    </Box>
  );
}

export default LisCards;
