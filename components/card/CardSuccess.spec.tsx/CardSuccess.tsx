import { Box, Card, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { ICheckout } from 'types/Checkout';

type Props = {
    data: ICheckout;
  };
const CardSuccess: FC<Props> = ({data}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "min-content",
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "20px", sm: "50px 90px" },
        background: "#037d20ae",
       
      }}
    >
     

      <Typography variant="h4" paddingBottom={10}  color="white" sx={{width:"100%", textAlign:"center"}} >
        ¡Que disfrutes tu compra!
      </Typography>

      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 15, sm: 15, md: 8, xl: 10 }}
        alignItems={{ xs: "center", sm: "center", md: "center" }}
      >
        <Box>
          <Typography variant="h5" maxWidth="400px" >
            {data?.order?.name}
          </Typography>
          <Box
            component="img"
            alt={data?.order?.name}
            src={`${data?.order?.image}`}
            sx={{
              maxWidth: 500,
              width: "100%",
              border: "3px solid #000",
              
            }}
          />
        </Box>
        <Box
          sx={{
           
            width: "100%",
            padding:"5px",
            border: "1px solid rgba(0, 0, 0, .125)",
            backgroundColor:"#f3f3f3",
           
          }}
        >
          <Typography variant="h5" paddingBottom={2}>
            Compra:
          </Typography>
          <Typography paddingBottom={1}>
            Precio: {data?.order?.price}
          </Typography>
          <Typography variant="h5" paddingBottom={2}>
            Datos de entrega:
          </Typography>
          <Typography paddingBottom={1}>
            Comprador: {`${data?.customer.name} `}
            {data?.customer?.lastname}
          </Typography>
          <Typography paddingBottom={1}>
            Dirección: {data?.customer?.address?.address1}
          </Typography>
          {data?.customer?.address?.address2 && (
            <Typography paddingBottom={1}>
              Dirección alternativa: {data?.customer.address.address2}
            </Typography>
          )}
         
        </Box>
      </Stack>
    </Card>
  )
}

export default CardSuccess