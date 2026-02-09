import { useEffect } from "react";

const useDefaultSetting = (imageList: readonly string[]) => {
  
  useEffect(() => {
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageList]);
};


export default useDefaultSetting;
