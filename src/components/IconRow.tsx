import { ChatBubbleOutline, FavoriteBorder, Send } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

const IconRow = () => {
  return (
    <Box
      sx={{
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 1,
      }}
    >
      <Stack direction='row' spacing={1}>
        <IconButton>
          <FavoriteBorder />
        </IconButton>
        <IconButton>
          <ChatBubbleOutline />
        </IconButton>
        <IconButton>
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default IconRow;
