import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import {  Stack, Typography } from "@mui/material";
import {getCharacter, getCharacters} from "dh-marvel/services/marvel/marvel.service";
import { CharacterMarvel, ResultCharacter } from "types/Character";
import { useRouter } from "next/router";
import { SpinnerDotted } from "spinners-react";




interface Props {
  character: ResultCharacter;
}

const Character: NextPage<Props> = ({ character }) => {
 
  const router = useRouter();

  if (router.isFallback)  return <Stack height={"100%"} alignItems="center" justifyContent="center"><SpinnerDotted color="black" size="40%"/></Stack>;
  return (
    <>
      <Head>
        <title>DH-MARVEL</title>
        <meta
          name="description"
          content={`${character?.name}.${character?.description}`}
        />
      </Head>
      <Stack component="section" direction="column" alignItems="center">
        <Stack
          component="section"
          maxWidth="xl"
          direction="column"
          spacing={10}
          alignItems="center"
          paddingY={15}
          paddingX={{ xs: 3, sm: 4, md: 4 }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{
              textTransform: "uppercase",
              fontWeight: "600",
            
            }}
          >
            {character?.name}
          </Typography>
          <Box
            component="img"
            alt={character?.name}
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
            sx={{
              maxWidth: 600,
              width: "100%",
              border: "8px solid #000",
            
            }}
          />
          {character?.description ? (
            <Typography gutterBottom component="div">
              {character?.description}
            </Typography>
          ) : (
            <Typography gutterBottom component="div">
              Personaje sin descripción.
            </Typography>
          )}
        </Stack>

        <Box
          sx={{
            background: "#f5f5f5",
            width: "100vw",
            padding: "0px",
            marging: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            component="section"
            maxWidth="xl"
            direction="column"
            alignItems="center"
            justifyContent="center"
            paddingY={15}
            paddingX={{ xs: 3, sm: 4, md: 4 }}
          >
           
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterMarvel = await getCharacters();

  const paths = data?.data?.results.map((character) => {
    return { params: { id: character.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Character;
