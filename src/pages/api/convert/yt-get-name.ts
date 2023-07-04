import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import { cleaner } from "~/utils/fileName";

export const config = {
  api: {
    responseLimit: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { query } = req;
    const url = query.url as string;
    const info = await ytdl.getInfo(url);
    const title = cleaner(info.videoDetails.title);
    res.status(200).json({ title });
  }
};

export default handler;
