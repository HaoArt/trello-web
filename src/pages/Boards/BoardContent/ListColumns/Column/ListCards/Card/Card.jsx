/* eslint-disable react/prop-types */
import CardMedia from '@mui/material/CardMedia';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// eslint-disable-next-line react/prop-types
function Card({ card }) {
  const showCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card._id,
      data: { ...card },
    });
  const dndkitCardStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndkitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '4px 4px 4px black ',
        overflow: 'unset',
        display:(card?.FE_PlaceholderCard ? 'none' : 'block')
      }}
    >
      {card?.cover && (
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image={card.cover}
        />
      )}

      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            paddingBottom: '12px',
          },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {showCardActions() && (
        <CardActions sx={{ padding: '0 4px 8px' }}>
          {!!card?.memberIds.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card?.memberIds.length}
            </Button>
          )}
          {!!card?.comments.length && (
            <Button size='small' startIcon={<CommentIcon />}>
              {card?.comments.length}
            </Button>
          )}
          {!!card?.attachments.length && (
            <Button size='small' startIcon={<AttachmentIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
