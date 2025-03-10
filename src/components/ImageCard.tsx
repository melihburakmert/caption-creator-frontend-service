import { ChangeEvent } from 'react';

import { UploadFile } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

interface ImageCardProps {
  image: string | null;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageCard = ({ image, handleImageUpload }: ImageCardProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        cursor: 'pointer',
      }}
      component='label'
    >
      {image ? (
        <Box component='img' src={image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Stack alignItems='center'>
          <UploadFile fontSize='large' />
          <Typography variant='body2'>Upload Image</Typography>
        </Stack>
      )}
      <input type='file' hidden onChange={handleImageUpload} />
    </Box>
  );
};

export default ImageCard;
