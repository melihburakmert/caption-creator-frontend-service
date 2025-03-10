import { ChangeEvent } from 'react';

import { Box } from '@mui/material';

import { CaptionTextBox, IconRow, ImageCard } from './';

interface ParentBoxProps {
  image: any;
  caption: string;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ParentBox = ({ image, caption, handleImageUpload }: ParentBoxProps) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <ImageCard image={image} handleImageUpload={handleImageUpload} />
      <IconRow />
      <CaptionTextBox caption={caption} />
    </Box>
  );
};

export default ParentBox;
