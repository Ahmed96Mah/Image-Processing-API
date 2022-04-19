import express from 'express';
import fs from 'fs';

const verifier = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  // First, record the query parameter.
  const fileName = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;
  const extension = req.query.ext as string;
  // Define the available extensions for the API.
  const availableExts = ['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'AVIF', 'TIFF'];
  // Set the initial verification status.
  let verifiyName = false;
  let verifiyW = false;
  let verifiyH = false;
  let verifiyExt = false;

  // (File Name Verification) check if the filename exists along with its query parameter.
  if (fileName !== '' && fileName !== undefined) {
    verifiyName = true;
  }
  // (Width Verification) check if the user has provided a non-zero width.
  if (width !== '' && width !== '0' && width !== undefined) {
    verifiyW = true;
  }
  // (Height Verification) check if the user has provided a non-zero height.
  if (height !== '' && height !== '0' && height !== undefined) {
    verifiyH = true;
  }
  // (Extension Verification) check if the user has provided an acceptable extension.
  if (
    extension !== '' &&
    extension !== undefined &&
    availableExts.includes(extension.toUpperCase())
  ) {
    verifiyExt = true;
  }
  // (Main Verification) check if the source image exists (in assets -> full) & verification tests passed.
  if (
    fs.existsSync(`./assets/full/${fileName}.jpg`) &&
    verifiyW === true &&
    verifiyH === true &&
    verifiyExt === true
  ) {
    console.log(`Verified file: ${fileName}.jpg & request's info...`);
    // If the source image exists, move to the next middleware (checker).
    next();
  } else {
    // (Main error handlers)..........
    // If the error relates to the file name.....
    if (!fs.existsSync(`./assets/full/${fileName}.jpg`)) {
      if (verifiyName === false) {
        if (fileName === undefined) {
          // If the filename query parameter dosen't exist.
          res
            .status(400)
            .send(`Error, The URL has to contain a query parameter: filename`);
        } else {
          // Else, query parameter exists but its value isn't set.
          res
            .status(400)
            .send(`Error, The filename query parameter must hold a value.`);
        }
      } else {
        // If the filename query parameter exists and hold a vlaue, but file doesn't exists.
        res
          .status(400)
          .send(`Error, ./assets/full/${fileName}.jpg doesn't exists!!`);
      }
    }
    // If the error relates to the requested file width.....
    if (verifiyW === false) {
      if (width === undefined) {
        res
          .status(400)
          .send(`Error, The URL has to contain a query parameter: width`);
      } else {
        res
          .status(400)
          .send(
            `Error, The image's width must be a non-zero value. Received: ${width}`
          );
      }
    }
    // If the error relates to the requested file height.....
    if (verifiyH === false) {
      if (height === undefined) {
        res
          .status(400)
          .send(`Error, The URL has to contain a query parameter: height`);
      } else {
        res
          .status(400)
          .send(
            `Error, The image's height must be a non-zero value. Received: ${height}`
          );
      }
    }
    // If the error relates to the requested file extension.....
    if (verifiyExt === false) {
      if (extension === undefined) {
        res
          .status(400)
          .send(`Error, The URL has to contain a query parameter: ext`);
      } else {
        res
          .status(400)
          .send(
            `Error, The available image extensions: JPG, JPEG, PNG, WEBP, GIF, AVIF, TIFF`
          );
      }
    }
  }
};

export default verifier;
