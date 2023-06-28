import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import { Button, Grid, Stack } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { useRouter } from "next/router";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { IComicsMarvel, IResult } from "types/Comic";
import Link from "next/link";
import DetailsCard from "dh-marvel/components/card/DetailsCard";
import { SpinnerDotted } from "spinners-react";
import RenderCharacthers from "dh-marvel/components/listCharacters/renderCharacthers";


interface Props {
  comic: IResult;
}

const Comic: NextPage<Props> = ({ comic }) => {
  const router = useRouter();

  if (router.isFallback)  return <Stack height={"100%"} alignItems="center" justifyContent="center"><SpinnerDotted color="black" size="40%"/></Stack>;



  return (
    <>
      <Head>
        <title>DH-MARVEL</title>
        <meta
          name="description"
          content={`Comic of Marvel.${comic.title}.${comic.series}`}
        />
      </Head>
      <Stack
        component="section"
        maxWidth="xl"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: "100px 20px",
        }}
      >
        <Box sx={{
                borderBottom: "2px solid black"
              }}>
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
               
              }}
            >
              <Box
                component="img"
                alt={comic.title}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                sx={{
                  boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                  margin: "auto",
                  maxWidth: "100%",
                  height:"500px"
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <DetailsCard comic={comic} />
            <Box
              sx={{
                paddingBottom: "90px",
              }}
            >
              {comic.stock > 0 ? (
                <Link
                  href={{ pathname: "/checkout/", query: `comic=${comic.id}` }}
                >
                  <Button
                    variant="contained"
                    endIcon={<AddShoppingCartOutlinedIcon />}
                  >
                    COMPRAR
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  endIcon={<AddShoppingCartOutlinedIcon />}
                >
                  SIN STOCK
                </Button>
              )}
            </Box>
         
          </Grid>
        </Grid>

        </Box>
      <RenderCharacthers comic={comic}/>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(`${params?.id}` );
  const data = await getComic(id);

  return {
    props: {
      comic: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicsMarvel = await getComics();

  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Comic;
