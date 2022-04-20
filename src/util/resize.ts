import express from 'express';
import path from 'path';
import sharpResize from '../sharp/sharpResize';

const sharpy = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  // First, record the query parameters.
  const fileName = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const process = req.query.process as string;
  const extension = req.query.ext as string;

  if (process.toLowerCase() === 'resize') {
    // Call the sharp API & provide it with path to the selected image.
    sharpResize(fileName, width, height, process, extension).then(() => {
      // After the image resizing, send the image for the user.
      const dirName = path.join(__dirname, '../../');
      res
        .status(200)
        .sendFile(
          `${dirName}/assets/thumb/thumb_${fileName}_${width}_${height}_0_${process}.${extension}`
        );
    });
  } else {
    next();
  }
};

export default sharpy;
