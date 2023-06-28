import type { NextApiRequest, NextApiResponse } from "next";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import {  IResult } from "types/Comic";
import { ERROR_SERVER } from "dh-marvel/services/marvel/comic.errors";


type Data = IResult| { error: string; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  const idInt = parseInt(`${id}`);
  res.setHeader("Content-Type", "application/json");
 

  try {
    const result: IResult = await getComic(idInt);
    res.status(200).json(result);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(ERROR_SERVER);
  }
}
