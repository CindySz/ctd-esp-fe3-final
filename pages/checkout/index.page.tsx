import { Box, Stack } from "@mui/material";
import CardCheckout from "dh-marvel/components/card/CardCheckout";
import MultiStepForm from "dh-marvel/components/form/Stepper";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { getComicsById } from "dh-marvel/services/marvel/marvel.service";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { IResult } from "types/Comic";


const Checkout: NextPage = () => {
  const router = useRouter();
  const { comic } = router.query;
  const [comicData, setComicData] = useState<IResult>();

  useEffect(() => {
    const id = parseInt(comic as string);

    if (comic) {
      getComicsById(id).then((data:any) => {
         setComicData(data);
      });
    }
  }, [comic]);

  if (!comic) {
    return <Stack height={"100%"} alignItems="center" justifyContent="center"><SpinnerDotted color="black" size="40%"/></Stack>;
  }

  return (
   
    <Box

   
      sx={{
        
        padding: { xs: "80px 2rem", sm: "100px 10rem", md:"100px 12rem", xl:"100px 22rem" }
      }}
    >
      <Stack
        direction={{ sm: "column", md: "row-reverse" }}
        spacing={{ xs: 15, sm: 15, md: 8, xl: 20 }}
       
        alignItems={{ xs: "center", sm: "center", md: "center" }}
      >

        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            height: "50%",
            padding: "30px"
          }}
        >
          <CardCheckout comic={comicData} />
        </Box>
        <Box>
          <MultiStepForm comic={comicData} />
        </Box>
        
      </Stack>
    </Box>
   
  );
};
(Checkout as any).Layout = LayoutCheckout;

export default Checkout;

