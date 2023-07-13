/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg"; // ffmpeg for converting stream to mp3
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import readline from "readline";

export const config = {
  api: {
    responseLimit: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    ffmpeg.setFfmpegPath(ffmpegPath.path);
    const { query } = req;
    const url = query.url as string;
    const fileName = query.fileName as string;
    const start = Date.now(); // define when conversion starts to detect how long conversion lasts
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}.mp3"`
    ); // set file name
    res.setHeader("Content-Type", "audio/mpeg"); // set content type
    const stream = ytdl(url, {
      // start video stream
      quality: "highestaudio",
    });
    ffmpeg(stream) // set ffmpeg source to ytdl stream
      .outputOptions(["-vn", "-ar 44100", "-ac 2", "-ab 192k", "-f mp3"])
      .audioCodec("libmp3lame") // use libmp3lame to convert to mp3
      .audioBitrate(128)
      .format("mp3") // specify format
      .on("error", (err) => console.error(err))
      .on("progress", (p) => {
        readline.cursorTo(process.stdout, 0); // preview downloaded kb on server console
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on("end", () =>
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)
      ) // Print how long conversion took
      .pipe(res, {
        // pipe converson data to response and end response
        end: true,
      });
  }
};

export default handler;
