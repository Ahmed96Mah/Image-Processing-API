import sharp from 'sharp';

const sharpRotate = async (
  fileName: string,
  width: number,
  height: number,
  angle: number,
  process: string,
  extension: string
): Promise<void> => {
  await sharp(`assets/full/${fileName}.jpg`)
    .rotate(angle, { background: '#0e0e0e' })
    .sharpen()
    .median(1)
    .resize(width, height)
    .toFile(
      `assets/thumb/thumb_${fileName}_${width}_${height}_${angle}_${process}.${extension}`
    );
};

export default sharpRotate;
