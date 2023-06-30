import { NextPage } from "next";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Box } from "@mui/material";
import { FaqsType } from "dh-marvel/components/faqs/faqsData";

interface Props{
  data: FaqsType
}
const Faqs: NextPage<Props> = ({data}) => {

  
  return (
    <>
      <Head>
        <title>DH-MARVEL</title>
        <meta
          name="description"
          content="Preguntas frecuentes- DH MARVEL"
        />
      </Head>
      <Box px={2} sx={{ maxWidth: 1500 }}>
        <BodySingle title={"Preguntas Frecuentes"}></BodySingle>
      {Array.isArray(data) &&
     
        data.map((faq) => {
          return (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      }


      </Box> 
  
    </>
  );
};

export default Faqs;

export const getStaticProps = async () => {
  const res = await fetch(`https://ctd-esp-fe3-final-swart.vercel.app/api/faqs`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}