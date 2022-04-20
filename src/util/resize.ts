import express from 'express';
import sharp from 'sharp';
import path from 'path';

const sharpy = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  // First, record the query parameters.
  const fileName = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const process = req.query.process as string;
  const extension = req.query.ext;

  if (process.toLowerCase() === 'resize') {
    // Call the sharp API & provide it with path to the selected image.
    sharp(`assets/full/${fileName}.jpg`)
      .resize(width, height)
      .toFile(
        `assets/thumb/thumb_${fileName}_${width}_${height}_0_${process}.${extension}`,
        (err) => {
          // This function always runs after the image is created.
          // If there is an error (send it to the user & log it to the server).
          if (err !== null) {
            console.log(`error, ${err}`);
            res.status(500).send(`error, ${err}`);
          } else {
            // After processing.
            console.log(
              `Created File: thumb_${fileName}_${width}_${height}_0_${process}.${extension}`
            );
            console.log(`Sending the processed thumb...`);
            const dirName = path.join(__dirname, '../../');
            res
              .status(200)
              .sendFile(
                `${dirName}/assets/thumb/thumb_${fileName}_${width}_${height}_0_${process}.${extension}`
              );
          }
        }
      );
  } else {
    next();
  }
};

export default sharpy;
