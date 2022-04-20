import express from 'express';
import path from 'path';
import sizeOf from 'image-size';
import sharpFlip from '../sharp/sharpFlip';

const flip = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  // First, record the query parameters.
  const fileName = req.query.filename as string;
  let width = req.query.width as string;
  let height = req.query.height as string;
  const process = req.query.process as string;
  const extension = req.query.ext as string;
  const dimensions = sizeOf(`assets/full/${fileName}.jpg`);

  // Check the values of width, height params.
  if (width === '' || width === undefined) {
    // If the width query doesn't exist or doesn't hold a value (Not a resizing process).
    width = dimensions.width as unknown as string;
  }
  if (height === '' || height === undefined) {
    // If the height query doesn't exist or doesn't hold a value (Not a resizing process).
    height = dimensions.height as unknown as string;
  }

  if (process.toLowerCase() === 'flip') {
    // Call the sharp API & provide it with path to the selected image.
    sharpFlip(
      fileName,
      parseInt(width),
      parseInt(height),
      process,
      extension
    ).then(() => {
      // After the image is flipped, send the image for the user.
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

export default flip;
