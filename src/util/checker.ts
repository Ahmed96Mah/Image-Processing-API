import express from 'express';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

const checker = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  // First, record the query parameters.
  const fileName = req.query.filename;
  let width = req.query.width as string;
  let height = req.query.height as string;
  let angle = req.query.rotate as string;
  const process = req.query.process as string;
  const extension = req.query.ext;
  const dimensions = sizeOf(`assets/full/${fileName}.jpg`);

  // Check the values of width, height, angle params.
  if (width === '' || width === undefined) {
    // If the width query doesn't exist or doesn't hold a value (Not a resizing process).
    width = dimensions.width as unknown as string;
  }
  if (height === '' || height === undefined) {
    // If the height query doesn't exist or doesn't hold a value (Not a resizing process).
    height = dimensions.height as unknown as string;
  }
  if (
    angle === '' ||
    angle === undefined ||
    process.toLowerCase() !== 'rotate'
  ) {
    // If the angle query doesn't exist or doesn't hold a value (Not a rotation process).
    angle = '0';
  }
  // Check if the thumb file already exists (has been processed before).
  if (
    fs.existsSync(
      `./assets/thumb/thumb_${fileName}_${width}_${height}_${angle}_${process}.${extension}`
    )
  ) {
    console.log(
      `File: thumb_${fileName}_${width}_${height}_${angle}_${process}.${extension} already exists!`
    );
    // Go back to the root directory (current directory src-> util).
    const dirName = path.join(__dirname, '../../');
    res
      .status(200)
      .sendFile(
        `${dirName}/assets/thumb/thumb_${fileName}_${width}_${height}_${angle}_${process}.${extension}`
      );
  } else {
    // If thumb doesn't exist, move to the processing middleware (sharp).
    next();
  }
};

export default checker;
