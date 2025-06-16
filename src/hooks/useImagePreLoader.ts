import { useEffect } from "react";

const useImagePreLoader = (imageList: string[]) => {
  useEffect(() => {
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageList]);
};

export default useImagePreLoader;
