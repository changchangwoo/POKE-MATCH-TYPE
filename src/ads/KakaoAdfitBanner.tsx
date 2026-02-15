import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { KAKAO_ADFIT_URL } from "@const/apiConfig";

const DEVICE_BANNER_SIZES = {
  mobile: { width: 320, height: 100, unitId: "DAN-RlQorOBvg7B1cDJc" },
  desktop: { width: 728, height: 90, unitId: "DAN-GjyVUynqNALh5jyk" },
};

declare global {
  interface Window {
    adsbykakao?: {
      push: (config: any) => void;
    };
    adfit: any;
  }
}

export default function KakaoAdfitBanner() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const currentSize = DEVICE_BANNER_SIZES[deviceType];

  useEffect(() => {
    const loadScript = () => {
      const scriptId = "kakao-adfit-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.type = "text/javascript";
        script.src = KAKAO_ADFIT_URL;
        document.body.appendChild(script);
      }
    };

    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(loadScript)
      : window.setTimeout(loadScript, 0);

    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId);
      }

      const globalAdfit = window.adfit;
      if (globalAdfit) {
        globalAdfit.destroy(currentSize.unitId);
      }

      const scriptEl = document.getElementById("kakao-adfit-script");
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, []);

  return (
    <div css={BannerContainer}>
      <ins
        ref={adRef}
        className="kakao_ad_area"
        style={{
          display: "block",
          width: `${currentSize.width}px`,
          height: `${currentSize.height}px`,
          textAlign: "center",
        }}
        data-ad-unit={currentSize.unitId}
        data-ad-width={currentSize.width}
        data-ad-height={currentSize.height}
      ></ins>
    </div>
  );
}

const BannerContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
