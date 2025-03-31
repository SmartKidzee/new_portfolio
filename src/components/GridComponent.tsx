interface GridComponentProps {
  images: string[];
}

export default function GridComponent({ images }: GridComponentProps) {
  return (
    <div className="grid-container">
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Blog Image ${index + 1}`} />
      ))}
    </div>
  );
} 