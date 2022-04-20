import express from 'express';
import sharp from 'sharp';
import path from 'path';
import sizeOf from 'image-size';

const flop = (req: express.Request, res: express.Response, next: Function) => {
  // First, record the query parameters.
  const fileName = req.query.filename;
  let width = req.query.width as string;
  let height = req.query.height as string;
  const process = req.query.process as string;
  const extension = req.query.ext;
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

  if (process.toLowerCase() === 'flop') {
    // Call the sharp API & provide it with path to the selected image.
    sharp(`assets/full/${fileName}.jpg`)
      .flop()
      .resize(parseInt(width), parseInt(height))
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

export default flop;
