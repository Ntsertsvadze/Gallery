import { useState } from "react";
import ImageModal from "./ImageModal";
import type { UnsplashPhoto } from "../types";

interface Props {
  image: UnsplashPhoto;
}

export default function ImageCard({ image }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={image.urls.thumb}
        alt={image.alt_description ?? ""}
        className="cursor-pointer rounded shadow hover:scale-105 transition-transform duration-200"
        onClick={() => setOpen(true)}
      />
      {open && <ImageModal image={image} onClose={() => setOpen(false)} />}
    </>
  );
}
