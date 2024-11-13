/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ReorderIcon from '@mui/icons-material/Reorder';
import ContentCopy from '@mui/icons-material/ContentCopy';
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LisCards from './ListCards/LisCards';
import Typography from '@mui/material/Typography';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mapOrder } from '~/utils/sort';

function Column({ column }) {
  //dndkit chỉ nhận arr chứ ko nhận object vd [id-1,id-2] chứ ko phải {id.id-1,id:id.id-2}
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column._id,
      data: { ...column },
    });
  const dndkitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //sort card
  const orderCards = mapOrder(column.cards, column.cardOrderIds, '_id');

  return (
    <Box
      ref={setNodeRef}
      style={dndkitColumnStyle}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        backgroundColor: 'primary.main',
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
      }}
    >
      {/*Header */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {column.title}
        </Typography>
        <Box>
          <ExpandMoreIcon
            id='basic-dropdown-icon'
            aria-controls={open ? 'basic-dropdown-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color='text-primary'
            sx={{ cursor: 'pointer' }}
          />
          <Menu
            id='basic-dropdown-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-dropdown-icon',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AddCardIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Add New Card</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentCut fontSize='small' />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentCopy fontSize='small' />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentPaste fontSize='small' />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize='small' />
              </ListItemIcon>
              <ListItemText>Remove this Column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize='small' />
              </ListItemIcon>
              <ListItemText>Archive this Column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {/*Content */}
      <LisCards cards={orderCards} />
      {/*Footer */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button startIcon={<AddCardIcon />} sx={{ color: 'text.color' }}>
          Add new card{' '}
        </Button>
        <Tooltip title='Drag to move'>
          <ReorderIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Column;
