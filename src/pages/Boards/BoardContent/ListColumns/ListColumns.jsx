/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          p: '10px 0',
          background: 'inherit',
          display: 'flex',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            backgroundColor: 'primary.main',
            ml: 2,
            height: 'fit-content',
            borderRadius: '6px',
          }}
        >
          <Button
            sx={{
              color: 'text.color',
              width: '100%',
              justifyContent: 'start',
              pl: 2,
              py: 1,
              mr: 1.5,
            }}
            startIcon={<NoteAddIcon />}
          >
            Add new columns
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
