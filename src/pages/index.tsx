import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import utf8 from "utf8";
import Modal from "~/components/modal";

const Home = () => {
  const [url, setUrl] = useState<string>("");

  const [isConvertinModalOpen, setIsConvertinModalOpen] =
    useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["youtube", url],
    async () =>
      fetch(`/api/convert/yt-convert?url=${url}`).then((res) => {
        const filename = extractFilename(
          res.headers.get("content-disposition") as string
        );
        const blob = res.blob();
        return { blob, filename };
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );

  const extractFilename = (filename: string) => {
    console.log(filename);
    const pattern =
      /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;
    const arr = pattern.exec(filename);
    console.log(arr);
    const name = utf8.decode(arr?.[2] ?? "");
    return name;
  };

  const handleConversion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!url) return alert("please add a youtube url");
    setIsConvertinModalOpen(true);
    console.log("youtue conversion starting...");
    await refetch();
    const downloadUrl = window.URL.createObjectURL(new Blob([data?.blob])); // creates tmp URL for blob data to enable download
    const link = document.createElement("a"); // generates fake link element in DOM
    link.href = downloadUrl; // setting href source to tmpURL variable called url
    console.log("handleConversion: ", data?.filename);
    link.setAttribute("download", data?.filename as string); // setting url behavier when clicked
    document.body.appendChild(link);
    link.click(); // simulating user click
    console.log("youtube conversion done...");
  };

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center bg-[url('/back.jpg')] bg-cover px-8 ">
      <Modal
        open={isConvertinModalOpen}
        setOpen={setIsConvertinModalOpen}
        isLoading={isLoading}
      />
      <h1 className="text-4xl font-bold text-white outline-black">
        Youtube to MP3 Converter
      </h1>
      <div className="mt-4 flex h-4/6 w-1/2 flex-col rounded bg-white p-4 shadow-lg">
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="mt-2 w-full min-w-0 flex-1 rounded rounded-r-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="add the youtube url here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="button"
          onClick={handleConversion}
          className=" mt-4  rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default Home;
