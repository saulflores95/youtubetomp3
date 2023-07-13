import { useQuery } from "@tanstack/react-query";

const convertYtStream = async (url: string, fileName: string) => {
  const res = await fetch(
    `/api/convert/yt-convert?url=${url}&fileName=${fileName}`
  );
  console.log("convertYtStream:", res);
  const blobData = await res.blob();
  console.log("convertYtStream:", blobData);
  return blobData;
};

const useStreamConversion = (url: string, fileName: string) =>
  useQuery(["youtube", url], async () => await convertYtStream(url, fileName), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

const useGetStreamName = (url: string) =>
  useQuery(
    ["fileName", url],
    () =>
      fetch(`/api/convert/yt-get-name?url=${url}`).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );

export { convertYtStream, useStreamConversion, useGetStreamName };
