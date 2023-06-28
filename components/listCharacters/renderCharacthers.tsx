import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Link, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react'
import { IResult } from 'types/Comic';
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
interface Props {
    comic: IResult;
  }
  
const RenderCharacthers: NextPage<Props> = ({comic}) => {

    const getId= (uri: string): number => {
        const array = uri.split("/");
        const id = array[array.length - 1];
      
        return parseInt(id);
      };
  return (
    <Accordion>
      <AccordionSummary 
       expandIcon={<ArrowForwardIosSharpIcon sx={{ dispay:"flex", justifyContent:"left" }} />}
      aria-controls="panel1d-content"
       id="panel1d-header">
        <Typography variant="body2">Personajes</Typography>
      </AccordionSummary>
      <AccordionDetails> 
        <Box>
          {comic.characters.items.length ? (
            comic.characters.items.map((character) => {
              return (
                <Link
                  href={`/characters/${getId(character.resourceURI)}`}
                  key={character.name}
                >
                  <Button fullWidth  size="small">
                    {character.name}
                  </Button>
                </Link>
              );
            })
          ) : (
            <Typography variant="body2">
             No se encuentra listado de personajes disponible.
            </Typography>
          )}
        </Box>
        </AccordionDetails>
    </Accordion>
  )
}

export default RenderCharacthers