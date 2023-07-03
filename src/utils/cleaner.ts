import utf8 from "utf8";

const cleaner = (title: string) => {
  const labels: string[] = [
    "(Official Video)",
    "[Official Video]",
    "[Official Music Video]",
    "(Music Video)",
    "[Audio]",
    "(Official Audio)",
    "(Lyrics)",
  ];
  const WS = "";
  for (const label of labels) {
    if (title.includes(label)) {
      title = title.replace(label, WS);
    }
  }
  return utf8.encode(title);
};

export default cleaner;
