import { Box, Typography } from '@mui/material';

interface CaptionBoxProps {
  caption: string;
}

const CaptionTextBox = ({ caption }: CaptionBoxProps) => {
  return (
    <Box
      sx={{
        height: 75,
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant='body2' color='textSecondary'>
        {caption || 'No caption available yet'}
      </Typography>
    </Box>
  );
};

export default CaptionTextBox;
