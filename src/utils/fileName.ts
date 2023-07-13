import utf8 from "utf8";

const cleaner = (title: string) => {
  const labels: string[] = [
    "(Official Video)",
    "[Official Video]",
    "[Official Music Video]",
    "(Official Music Video)",
    "(Music Video)",
    "[Audio]",
    "(Official Audio)",
    "(Lyrics)",
    "(Visualizer)",
    "(Lyrics Video)",
    "(Official Lyric Video)",
    "(Lyric Video)",
  ];

  const WS = "";
  for (const label of labels) {
    if (title.includes(label)) {
      title = title.replace(label, WS);
    }
  }
  return utf8.encode(title);
};

const extractFilename = (filename: string) => {
  const pattern =
    /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;
  const arr = pattern.exec(filename);
  const name = utf8.decode(arr?.[2] ?? "");
  return name;
};

export { cleaner, extractFilename };
