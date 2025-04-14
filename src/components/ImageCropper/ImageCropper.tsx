import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Slider } from '../../components/ui/slider';

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  open: boolean;
  onClose: () => void;
  aspectRatio?: number;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to match crop size exactly
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  
  // Fill with black background first to ensure any area beyond the image is black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Translate canvas context to origin (0,0)
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Draw the cropped image onto the canvas 
  // This will draw the visible portion of the image and keep the black background for any area outside
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return the data URL of the canvas
  return canvas.toDataURL('image/jpeg', 0.95);
};

export function ImageCropper({
  image,
  onCropComplete,
  open,
  onClose,
  aspectRatio = 1,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [rotation, setRotation] = useState(0);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onRotationChange = (value: number[]) => {
    setRotation(value[0]);
  };

  const onCropCompleteCallback = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropConfirm = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
        onCropComplete(croppedImage);
        onClose();
      }
    } catch (e) {
      console.error('Error getting cropped image:', e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Adjust Photo</DialogTitle>
        </DialogHeader>
        
        <div className="relative h-[350px] w-full my-6 bg-black rounded-xl overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={onZoomChange}
            cropShape="round"
            showGrid={true}
            objectFit="contain"
            restrictPosition={false}
            mediaProps={{ style: { maxHeight: '100%', maxWidth: '100%' } }}
            style={{
              containerStyle: { 
                position: 'relative', 
                width: '100%', 
                height: '100%',
                backgroundColor: '#000'
              },
              cropAreaStyle: {
                border: '2px solid #fff',
                boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.85)'
              }
            }}
          />
        </div>
        
        <div className="space-y-6 px-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Zoom</label>
              <span className="text-xs text-gray-400">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <Slider
                value={[zoom]}
                min={0.5}
                max={3}
                step={0.1}
                onValueChange={(value: number[]) => setZoom(value[0])}
                className="flex-1"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Rotation</label>
              <span className="text-xs text-gray-400">{rotation}°</span>
            </div>
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <Slider
                value={[rotation]}
                min={0}
                max={360}
                step={1}
                onValueChange={onRotationChange}
                className="flex-1"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-between space-x-4 pt-4 border-t border-gray-800">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 bg-transparent text-white border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCropConfirm}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 