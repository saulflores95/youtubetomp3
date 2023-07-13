import { useQuery } from "@tanstack/react-query";

const convertSCStream = async (url: string) => {
  const res = await fetch(`/api/convert/sc-convert?url=${url}`);
  const headers = res.headers.get("Content-Disposition");
  const fileName = headers?.split("filename=")[1];
  const blob = await res.blob();
  return {
    blob,
    name: fileName,
  };
};

const useSoundCloudStartStream = (url: string) =>
  useQuery(["soundcloud", url], async () => await convertSCStream(url), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
    onSuccess: (data) => {
      const fileName = data.name?.toString().replace(/"/g, "");
      const downloadUrl = window.URL.createObjectURL(new Blob([data.blob])); // creates tmp URL for blob data to enable download
      const link = document.createElement("a"); // generates fake link element in DOM
      link.href = downloadUrl; // setting href source to tmpURL variable called url
      // set blob name to fileName
      link.setAttribute("download", `${fileName as string}` ?? ""); // setting url behavier when clicked
      document.body.appendChild(link);
      link.click(); // simulating user click
    },
  });

export { convertSCStream, useSoundCloudStartStream };
