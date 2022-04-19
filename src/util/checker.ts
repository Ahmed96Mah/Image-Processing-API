import express from 'express';
import fs from 'fs';
import path from 'path';

const checker = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  // First, record the query parameters.
  const fileName = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;
  const extension = req.query.ext;
  // Check if the thumb file already exists (has been processed before).
  if (
    fs.existsSync(
      `./assets/thumb/thumb_${fileName}_${width}_${height}.${extension}`
    )
  ) {
    console.log(
      `File: thumb_${fileName}_${width}_${height}.${extension} already exists!`
    );
    console.log('Sending the existing thumb...');
    // Go back to the root directory (current directory src-> util).
    const dirName = path.join(__dirname, '../../');
    res
      .status(200)
      .sendFile(
        `${dirName}/assets/thumb/thumb_${fileName}_${width}_${height}.${extension}`
      );
  } else {
    // If thumb doesn't exist, move to the processing middleware (sharp).
    next();
  }
};

export default checker;
