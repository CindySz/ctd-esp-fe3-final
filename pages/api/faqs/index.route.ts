import { faqsData } from "dh-marvel/components/faqs/faqsData";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    res.status(200).json(faqsData)
  }