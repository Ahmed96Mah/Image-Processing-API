import sharp from 'sharp';

const sharpFlip = async (
  fileName: string,
  width: number,
  height: number,
  process: string,
  extension: string
): Promise<void> => {
  await sharp(`assets/full/${fileName}.jpg`)
    .flip()
    .resize(width, height)
    .toFile(
      `assets/thumb/thumb_${fileName}_${width}_${height}_0_${process}.${extension}`
    );
};

export default sharpFlip;
