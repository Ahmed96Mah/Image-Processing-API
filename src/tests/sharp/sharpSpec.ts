import sharpResize from '../../sharp/sharpResize';
import sharpRotate from '../../sharp/sharpRotate';
import sharpFlip from '../../sharp/sharpFlip';
import sharpFlop from '../../sharp/sharpFlop';

describe('Checks the image processing functions', () => {
  const fileName = 'fjord';
  const width = 250;
  const height = 250;
  const angle = 30;
  const process: string[] = ['resize', 'rotate', 'flip', 'flop'];
  const extensions = 'jpeg';

  describe('Testing the sharp resize function', () => {
    it('expects resize to work correctly when all parameters exists', () => {
      expect(async () => {
        await sharpResize(fileName, width, height, process[0], extensions);
      }).not.toThrow();
    });
  });

  describe('Testing the sharp rotate function', () => {
    it('expects rotate to work correctly when all parameters exists', () => {
      expect(async () => {
        await sharpRotate(
          fileName,
          width,
          height,
          angle,
          process[1],
          extensions
        );
      }).not.toThrow();
    });
  });

  describe('Testing the sharp flip function', () => {
    it('expects flip to work correctly when all parameters exists', () => {
      expect(async () => {
        await sharpFlip(fileName, width, height, process[2], extensions);
      }).not.toThrow();
    });
  });

  describe('Testing the sharp flop function', () => {
    it('expects flop to work correctly when all parameters exists', () => {
      expect(async () => {
        await sharpFlop(fileName, width, height, process[3], extensions);
      }).not.toThrow();
    });
  });
});
