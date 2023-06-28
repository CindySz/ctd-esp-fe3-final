import { Box, Button, Stack } from "@mui/material";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ICheckout } from "types/Checkout";
import { SpinnerDotted } from "spinners-react";
import CardSuccess from "dh-marvel/components/card/CardSuccess";
import Link from "next/link";

const SuccesCheckout: NextPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      router.push("/");
    }
  }, []);

  if (!dataCheckout) {
    return <Stack height={"100%"} alignItems="center" justifyContent="center"><SpinnerDotted color="black" size="40%"/></Stack>;
  }

  return (

    <Box

   
    sx={{
      
      padding: { xs: "0px 2rem", sm: "0px 10rem", md:"0px 12rem", xl:"0px 22rem" }
    }}
  >
    <Stack paddingBottom={2} direction="column" alignItems="center">
    <Link href="/">
        <Button variant="outlined" sx={{ marginBottom: 1.5 }}>
          Volver a la página principal
        </Button>
      </Link>
      <CardSuccess data={dataCheckout} />
      
    </Stack>
    </Box>
  );
};
(SuccesCheckout as any).Layout = LayoutCheckout;

export default SuccesCheckout;
