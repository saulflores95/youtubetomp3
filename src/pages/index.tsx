import router from "next/router";
import { useState } from "react";
import Modal from "~/components/modal";
import { useGetStreamName, useStartStream } from "~/queries/yt-queries";

const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [isConvertingModalOpen, setIsConvertingModalOpen] =
    useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: fileData, refetch: getFileName } = useGetStreamName(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const fileName = fileData?.title as string;

  const handleConversion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!url) return alert("please add a youtube url");
    console.log("youtube conversion starting...");
    await getFileName();
    setIsConvertingModalOpen(true);
  };
  const { refetch: startStream } = useStartStream(url, fileName ?? "");

  const [downloadingInfo, setDownloadingInfo] = useState<boolean>(false);

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDownloadingInfo(true);
    await startStream();
    setDownloadingInfo(false);
    setIsConvertingModalOpen(false);
    setUrl("");
  };

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center bg-[url('/back.jpg')] bg-cover px-8 ">
      <Modal
        open={isConvertingModalOpen}
        url={url}
        setOpen={setIsConvertingModalOpen}
        fileName={fileName}
        handleDownload={handleDownload}
        downloadingInfo={downloadingInfo}
      />
      <h1 className="text-4xl font-bold text-white outline-black">
        Youtube to MP3 Converter
      </h1>
      <div className="mt-4 flex h-4/6 w-full flex-col rounded bg-white p-4 shadow-lg md:w-1/2">
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
      <div className="mt-4 flex h-10 justify-center shadow-lg md:w-1/4">
        <button
          className="w-full rounded-md bg-white shadow-lg"
          onClick={() => router.push("/sc")}
        >
          Go to SoundCloud converter
        </button>
      </div>
    </div>
  );
};

export default Home;
