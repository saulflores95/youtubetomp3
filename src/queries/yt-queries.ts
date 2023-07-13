import { useQuery } from "@tanstack/react-query";

const convertYtStream = async (url: string, fileName: string) => {
  const res = await fetch(
    `/api/convert/yt-convert?url=${url}&fileName=${fileName}`
  );
  return await res.blob();
};

const useStartStream = (url: string, fileName: string) =>
  useQuery(["youtube", url], async () => await convertYtStream(url, fileName), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
    onSuccess: (data) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data])); // creates tmp URL for blob data to enable download
      const link = document.createElement("a"); // generates fake link element in DOM
      link.href = downloadUrl; // setting href source to tmpURL variable called url
      link.setAttribute("download", `${fileName}.mp3` ?? ""); // setting url behavier when clicked
      document.body.appendChild(link);
      link.click(); // simulating user click
    },
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

export { convertYtStream, useStartStream, useGetStreamName };
