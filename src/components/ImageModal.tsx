import type { UnsplashPhoto } from "../types";

interface Props {
  image: UnsplashPhoto;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-lg">
          <img
            src={image.urls.full}
            alt={image.alt_description ?? "Image"}
            className="mb-4 max-h-[70vh] w-full object-contain rounded"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{image.description || "No description"}</p>
            <p className="text-sm text-gray-600">By: {image.user.name}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

