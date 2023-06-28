import type { NextApiRequest, NextApiResponse } from "next";
import {
  ERROR_BAD_PARAMETERS_REQUESTS,
  ERROR_BAD_REQUEST,
  ERROR_INVALID_CREDENTIALS,
  ERROR_SERVER,
} from "dh-marvel/services/marvel/comic.errors";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { IComicsMarvel } from "types/Comic";

type Data = IComicsMarvel | { error: string; message: string };

type Query = {
  offset: string;
  limit: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = req.query;

  const { offset, limit } = query as Query;
 

  const offsetInt = parseInt(offset);
  const limitInt = parseInt(limit);

  try {
    const result: IComicsMarvel = await getComics(offsetInt, limitInt);

    if (result.code === 401) {
      res.status(401).json(ERROR_INVALID_CREDENTIALS);
      return;
    }
    if (result.code === 409) {
      res.status(409).json(ERROR_BAD_PARAMETERS_REQUESTS);
      return;
    }
    if (result.code === 200) {
      res.status(200).json(result);
      return;
    }

    res.status(400).json(ERROR_BAD_REQUEST);
  } catch (err) {
    console.log(err);
    res.status(500).json(ERROR_SERVER);
  }
}
