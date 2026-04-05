import Image from "next/image";

interface AuthLeftPanelProps {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
}

export default function AuthLeftPanel({
  imageSrc,
  imageWidth = 270,
  imageHeight = 270,
  imageAlt = "",
}: AuthLeftPanelProps) {
  return (
    <div className="w-2/5 relative hidden md:block bg-primary-gradient">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <Image width={imageWidth} height={imageHeight} src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}
