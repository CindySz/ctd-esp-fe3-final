import { Box,  Typography } from '@mui/material';
import React, { FC } from 'react'
import { IResult } from 'types/Comic';

type Props = {
    comic: IResult | undefined;
  };

const CardCheckout: FC<Props> = ({comic}) => {
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            maxWidth={"400px"}
          >
           
              <Box
                sx={{ maxHeight: 400, maxWidth: "60%" }}
                component="img"
                src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                alt={comic?.title}
              />
          
          </Box>
          
    
          <Box
            sx={{
              paddingY: 3,
            }}
          >
          
          
              <Typography variant="h5">{comic?.title}</Typography>
          
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, .125)",
              borderTop: "1px solid rgba(0, 0, 0, .125)",
              display: "flex",
              justifyContent: "space-between",
              paddingY: { xs: 1.5, sm: 2.5 },
            }}
          >
            
                <Typography variant="h6">Precio</Typography>
    
                <Typography variant="h6">$ {comic?.price}</Typography>
             
          </Box>
        </Box>
      );
}

export default CardCheckout