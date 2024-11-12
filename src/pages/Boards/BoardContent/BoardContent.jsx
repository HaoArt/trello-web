/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sort';
function BoardContent({ board }) {
  const orderColumns = mapOrder(board.columns, board.columnOrderIds, '_id');
  return (
    <Box
      sx={{
        with: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        borderTop: '1px solid',
        borderTopColor: 'primary.main',
        color: 'text.color',
      }}
    >
      <ListColumns columns={orderColumns} />
    </Box>
  );
}

export default BoardContent;
