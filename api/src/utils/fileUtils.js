import fs from 'fs';
import path from 'path';

export const readFileContent = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

export const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
