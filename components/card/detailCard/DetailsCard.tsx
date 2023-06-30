import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react'
import { IResult } from 'types/Comic';


interface Props {
    comic: IResult;
  }

const DetailsCard: NextPage<Props> = ({comic}) => {

      const off=  Math.round(100 - (comic?.price * 100) / comic?.oldPrice)
      
  return (
    <Box
    sx={{
        padding: "20px",
    }}
  >
    
    <Typography gutterBottom variant="h5">
      {comic.title}
    </Typography>
   
    <Box
      sx={{
        padding: "30px 0px",
      }}
    >
      {comic.oldPrice && comic.stock > 0 && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            textDecoration: "line-through",
            marginBottom: "5px",
            paddingRight: "15px",
          }}
        >
          ${comic.oldPrice}
        </Typography>
      )}

      {off > 0 && (
        <Typography variant="h6" color="text.secondary">
          {off}% OFF!
        </Typography>
      )}
    </Box>
    <Typography variant="h4">${comic.price}</Typography>
  </Box>
);
  
}

export default DetailsCard