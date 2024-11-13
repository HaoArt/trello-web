/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import { capitalizeFirstLetter } from '~/utils/formater';

const menuStyles = {
  color: 'primary.main',
  backgroundColor: 'background.default',
  padding: '5px',
  borderRadius: '5px',
  paddingX: 2,
  '& .MuiSvgIcon-root': {
    color: 'primary.main',
  },
  '&:hover': {
    backgroundColor: 'primary.50',
  },
};
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        with: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        paddingX: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid',
        borderTopColor: 'primary.main',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={menuStyles}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={menuStyles}
          icon={<PublicIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={menuStyles}
          icon={<AddToDriveIcon />}
          label='Add to GoogleDrive'
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={menuStyles}
          icon={<BoltIcon />}
          label='Automation'
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={menuStyles}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
          // onClick={()=>{}}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: '16px',
              color: '#fff',
            },
          }}
        >
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/463176155_1723386331825687_2980580676551598887_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-4xhsUwhvVYQ7kNvgH7Xzqm&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=APIpagPrL_zyT2u7wgUlfyT&oh=00_AYBQJST5MjSiXrJNDRK6_5IL2vC4oaz_TTSl8JcXeS0xmQ&oe=67336FCF'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2023/12/Anh-Dai-Dien-Facebook-Cuc-Dep.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/08/Nh%C3%B3c-Maruko-d%E1%BB%85-th%C6%B0%C6%A1ng-1024x1024.jpeg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/08/Avatar-FB-cute.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/07/T%E1%BA%A3i-h%C3%ACnh-n%E1%BB%81n-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-5.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/07/T%E1%BA%A3i-h%C3%ACnh-n%E1%BB%81n-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-2.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-avatar-c%C3%B4-g%C3%A1i-t%C3%B3c-ng%E1%BA%AFn-d%E1%BB%85-th%C6%B0%C6%A1ng.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-avt-Anime.jpg'
            />
          </Tooltip>
          <Tooltip title='haone'>
            <Avatar
              alt='HaoNe'
              src='https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-avt-cute.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
