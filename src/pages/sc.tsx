import Head from "next/head";
import router from "next/router";
import { useState } from "react";
import Modal from "~/components/modal";
import { useSoundCloudStartStream } from "~/queries/sc-queries";

const SoundCloudConverterPage = () => {
  const [url, setUrl] = useState<string>("");
  const [isConvertingModalOpen, setIsConvertingModalOpen] =
    useState<boolean>(false);

  const { refetch: startStream } = useSoundCloudStartStream(url);

  const handleConversion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!url) return alert("please add a soundcloud url");
    setIsConvertingModalOpen(true);
    await startStream();
    setIsConvertingModalOpen(false);
    setUrl("");
  };

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center bg-[url('/back.jpg')] bg-cover px-8 ">
      <Head>
        <title>SoundCloud to MP3 Converter</title>
      </Head>
      <Modal
        open={isConvertingModalOpen}
        url={url}
        setOpen={setIsConvertingModalOpen}
        fileName={"test"}
      />
      <h1 className="text-4xl font-bold text-white outline-black">
        SoundCloud to MP3 Converter
      </h1>
      <div className="mt-4 flex h-4/6 w-full flex-col rounded bg-white p-4 shadow-lg md:w-1/2">
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="mt-2 w-full min-w-0 flex-1 rounded rounded-r-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="add the soundcloud url here"
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
          onClick={() => router.push("/")}
        >
          Go to YouTube converter
        </button>
      </div>
    </div>
  );
};

export default SoundCloudConverterPage;
