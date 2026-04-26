"use client";

import { useAvatarUpload } from "@/lib/hooks/useAvatarUpload";
import { useProfile } from "@/lib/hooks/useProfile";
import { useCallback, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { LuImagePlus, LuUpload } from "react-icons/lu";
import { Button } from "../ui/button";

const VALID_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 200 * 1024;

const CropImageUploader = () => {
  const { avatarUrl } = useProfile();
  const { uploadCroppedAvatar, isUploading, error } = useAvatarUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(avatarUrl);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    if (!VALID_TYPES.includes(file.type)) {
      setFileError("Format harus jpg/jpeg/png");
      return;
    }
    if (file.size > MAX_SIZE) {
      setFileError("Ukuran file maks 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    await uploadCroppedAvatar(imageSrc, croppedAreaPixels);
    if (!error) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={onFileChange}
        disabled={isUploading}
        className="hidden"
      />

      {/* Crop area atau placeholder */}
      {imageSrc ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full h-64 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer gap-2"
        >
          <LuImagePlus className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Klik untuk pilih foto
          </p>
          <p className="text-xs text-muted-foreground/60">
            JPG, JPEG, PNG • Maks 200KB
          </p>
        </div>
      )}

      {/* Error */}
      {(fileError || error) && (
        <p className="text-sm text-red-500">{fileError ?? error}</p>
      )}

      {/* Zoom + actions */}
      {imageSrc && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              disabled={isUploading}
              className="w-full accent-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            {/* Ganti foto */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="outline"
              className="border px-4 py-2 text-sm disabled:opacity-50"
            >
              <LuImagePlus className="w-4 h-4" />
              Ganti Foto
            </Button>

            {/* Upload */}
            <Button
              onClick={handleUpload}
              disabled={isUploading || !croppedAreaPixels}
              className="w-auto px-4 bg-primary-gradient"
            >
              <LuUpload className="w-4 h-4" />
              {isUploading ? "Mengupload.." : "Upload"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CropImageUploader;
