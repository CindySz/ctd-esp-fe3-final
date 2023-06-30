import {  Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import {  getComicsById } from 'dh-marvel/services/marvel/marvel.service';
import Link from 'next/link';
import  { useRouter } from 'next/router';
import React, { FC } from 'react'
import { IResult } from 'types/Comic';


interface Props {
    comic: IResult;
}

const CardComic: FC<Props> = ({ comic }) => {

 
  const router = useRouter();

  const handleBuy = async (id: number) => {
    const response: IResult = await getComicsById(id);

    if (response.stock > 0) {
      router.push({
        pathname: "/checkout",
        query: { comic: comic.id },
      });
    } else {
      router.push(`/comics/${id}`);
    }
  };

    return (
        <Card
            variant="outlined"
        
        >

            
            <CardMedia
                component="img"
                height="300px"                
                image={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                alt={comic?.title}

            />
           
            <CardContent >
                <Typography gutterBottom variant='h6' component='div' sx={{ height:"4.5rem"}} >
                    {comic?.title}
                </Typography>
            </CardContent>


            <CardActions >
              
                <Link href={`/comics/${comic?.id}`}>
        <Button variant="outlined" >Ver detalles</Button>
      </Link>
      <Button variant="contained" onClick={() => handleBuy(comic?.id)}>
        COMPRAR
      </Button>
            </CardActions>
        </Card>
    )
}

export default CardComic