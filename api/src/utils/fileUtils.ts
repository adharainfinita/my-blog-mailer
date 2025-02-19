import fs from "fs";

export const readFileContent = (filePath: fs.PathLike): string => {
  return fs.readFileSync(filePath, "utf8");
};

export const deleteFile = (filePath: fs.PathLike): void => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
