import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

interface KakaoAdfitBannerProps {}

const DEVICE_BANNER_SIZES = {
  mobile: { width: 320, height: 100, unitId: "DAN-RlQorOBvg7B1cDJc" },
  desktop: { width: 728, height: 90, unitId: "DAN-GjyVUynqNALh5jyk" },
};

// interface Adfit {
//   display: (unit: string) => void;
//   destroy: (unit: string) => void;
//   refresh: (unit: string) => void;
// }

declare global {
  interface Window {
    adsbykakao?: {
      push: (config: any) => void;
    };
    adfit: any;
  }
}

export default function KakaoAdfitBanner({}: KakaoAdfitBannerProps) {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const [scriptLoaded, setScriptLoaded] = useState(false);
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

  // 카카오 스크립트 로드
  useEffect(() => {
    const scriptId = "kakao-adfit-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.type = "text/javascript";
      script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";

      script.onload = () => {
        setScriptLoaded(true);
      };

      script.onerror = () => {
        console.error("카카오 애드핏 스크립트 로드 실패");
      };

      document.body.appendChild(script);
    } else {
      // 이미 스크립트가 로드되어 있다면
      setScriptLoaded(true);
    }

    console.log(window.adfit, currentSize);

    return () => {
      const globalAdfit = window.adfit;
      if (globalAdfit) globalAdfit.destroy(currentSize.unitId);
    };
  }, []);

  // 광고 렌더링
  useEffect(() => {
    if (scriptLoaded && adRef.current) {
      try {
        // 기존 광고 내용 정리
        if (adRef.current) {
          adRef.current.innerHTML = "";
        }

        // 카카오 애드핏 광고 푸시
        if (window.adsbykakao) {
          window.adsbykakao.push({
            adUnit: currentSize.unitId,
            width: currentSize.width,
            height: currentSize.height,
            el: adRef.current,
          });
        }
      } catch (error) {
        console.error("카카오 애드핏 광고 로드 오류:", error);
      }
    }
  }, [scriptLoaded, currentSize, currentSize.unitId]);

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
