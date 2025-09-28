import { clipboard, nativeImage } from 'electron';

export const clearClipboard = () => {
  try {
    clipboard.clear();
    clipboard.writeText('');
    clipboard.writeImage(nativeImage.createEmpty());
    clipboard.writeRTF('');
    clipboard.writeHTML('');

    console.log('Clipboard cleared');
  } catch (error) {
    console.error('Error clearing clipboard', error);
  }
};
