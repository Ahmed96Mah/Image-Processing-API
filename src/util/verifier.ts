import express from 'express';
import fs from 'fs';

const verifier = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  // First, record the query parameter.
  const fileName = req.query.filename;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const angle = req.query.rotate as string;
  const process = req.query.process as string;
  const extension = req.query.ext as string;
  // Define the available extensions for the API.
  const availableExts = ['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'AVIF', 'TIFF'];
  const availableProcess = ['RESIZE', 'ROTATE', 'FLIP', 'FLOP'];
  // Set the initial verification status.
  let verifiyName: boolean = false;
  let verifiyW: boolean = false;
  let verifiyH: boolean = false;
  let verifiyExt: boolean = false;
  let verifiyA: boolean = false;
  let verifiyP: boolean = false;

  // (File Name Verification) check if the filename exists along with its query parameter.
  if (fileName !== '' && fileName !== undefined) {
    verifiyName = true;
  }

  // (Width Verification) check if the user has provided a non-zero width (Mainly required for resizing process).
  if (
    (width !== '' &&
      width !== '0' &&
      width !== undefined &&
      !/[a-zA-Z]/.test(width) &&
      parseInt(width) > 0) ||
    (process !== undefined &&
      process.toUpperCase() !== 'RESIZE' &&
      (!/[a-zA-Z]/.test(width) || width === undefined) &&
      (parseInt(width) > 0 || width === undefined))
  ) {
    verifiyW = true;
  }

  // (Height Verification) check if the user has provided a non-zero height (Mainly required for resizing process).
  if (
    (height !== '' &&
      height !== '0' &&
      height !== undefined &&
      !/[a-zA-Z]/.test(height) &&
      parseInt(height) > 0) ||
    (process !== undefined &&
      process.toUpperCase() !== 'RESIZE' &&
      (!/[a-zA-Z]/.test(width) || width === undefined) &&
      (parseInt(height) > 0 || width === undefined))
  ) {
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

  // (Rotation Angle Verification) only require the rotation angle for rotation process.
  if (
    (angle !== '' && angle !== undefined && !/[a-zA-Z]/.test(angle)) ||
    (process !== undefined && process.toUpperCase() !== 'ROTATE')
  ) {
    verifiyA = true;
  }

  // (Process Verification) check if the entered process is avaiable.
  if (
    process !== '' &&
    process !== undefined &&
    availableProcess.includes(process.toUpperCase())
  ) {
    verifiyP = true;
  }

  // (Main Verification) check if the source image exists (in assets -> full) & verification tests passed.
  if (
    fs.existsSync(`./assets/full/${fileName}.jpg`) &&
    verifiyW === true &&
    verifiyH === true &&
    verifiyExt === true &&
    verifiyA === true &&
    verifiyP === true
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

    // If the error relates to the requested file rotation angle.....
    if (verifiyA === false) {
      if (angle === undefined) {
        res
          .status(400)
          .send(`Error, The URL has to contain a query parameter: rotate`);
      } else {
        res
          .status(400)
          .send(
            `Error, The image's rotation angle must hold a value. Received: ${angle}`
          );
      }
    }

    // If the error relates to the requested process.....
    if (verifiyP === false) {
      if (process === undefined) {
        res
          .status(400)
          .send(`Error, The URL has to contain a query parameter: process`);
      } else {
        res
          .status(400)
          .send(
            `Error, The available image processes: RESIZE, ROTATE, FLIP, FLOP`
          );
      }
    }
  }
};

export default verifier;
