import type { NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics, getComicsByPage } from 'dh-marvel/services/marvel/marvel.service';
import { IComicsMarvel } from 'types/Comic';
import GridLayout from 'dh-marvel/components/grid/Grid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PaginationMarvel from 'dh-marvel/components/pagination/Pagination';
import { Box } from '@mui/material';





interface Props {
  comics: IComicsMarvel;
}
const LIMIT_OF_CARDS = 12;
const Index: NextPage<Props> = ({ comics }) => {



  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [comicsResult, setComicsResult] = useState<IComicsMarvel>();
  const pages: number = comics?.data?.total !== undefined ? Math.ceil(comics.data.total / 12) : 1;




  useEffect(() => {
    localStorage.clear();
  }, []);


  useEffect(() => {
    if (currentPage !== null) {

      router.push(`/?page=${currentPage}`);

      getComicsByPage(LIMIT_OF_CARDS, currentPage).then(
        (data: IComicsMarvel) => {
          if (data.code === 200) {
            setComicsResult(data);
          }
        }
      );
    }
  }, [currentPage]);




  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodySingle title={"Marvel Comics"}>
        <Box
          sx={{ marginBottom: "20px", marginTop: "20px" }}>
          <PaginationMarvel
            pages={pages}
            setCurrentPage={setCurrentPage}

          />
        </Box>

        <Box
          sx={{ marginBottom: "20px" }}>

          <GridLayout
            comics={
              comicsResult === undefined
                ? comics.data?.results
                : comicsResult.data?.results
            }
          />

        </Box>


      </BodySingle>








    </>
  )
}


export async function getServerSideProps() {
  const comics = await getComics(0, LIMIT_OF_CARDS);

  return { props: { comics } };
}

export default Index


