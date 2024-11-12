/* eslint-disable react/prop-types */
import CardMedia from '@mui/material/CardMedia';
import { Card as TrelloCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// eslint-disable-next-line react/prop-types
function Card({ card }) {
  const showCardActions = () => {
    return (
      !!card?.memberIds.length ||
      !!card?.comments.length ||
      !!card?.attachments.length
    );
  };
  return (
    <TrelloCard
      sx={{
        cursor: 'pointer',
        boxShadow: '4px 4px 4px black ',
        overflow: 'unset',
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
    </TrelloCard>
  );
}

export default Card;
