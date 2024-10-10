"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, X } from "lucide-react";

type ImageUploadProps = {
  onChange: (file: File | null) => void;
  mimeTypes?: string[];
};

export function ImageInput({ onChange, mimeTypes }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";

    input.accept = mimeTypes ? mimeTypes.join(",") : "image/*";

    input.addEventListener("change", async (e) => {
      const file = input.files?.[0] || null;

      input.remove();

      onChange(file);

      if (!file) {
        setPreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
    input.classList.add("hidden");
    document.body.appendChild(input);
    input.click();
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center" onClick={handleClick}>
      <div className="flex-1">
        <Label
          htmlFor="image"
          className="flex items-center justify-center w-full h-32 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-contain w-full h-full rounded-md"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #bbb 25%, transparent 25%),
                  linear-gradient(-45deg, #bbb 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #bbb 75%),
                  linear-gradient(-45deg, transparent 75%, #bbb 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            />
          ) : (
            <span className="flex items-center space-x-2">
              <ImageIcon className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">
                Click to upload an image
              </span>
            </span>
          )}
        </Label>
      </div>
      {preview && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleRemove}
          className="flex-shrink-0 ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
