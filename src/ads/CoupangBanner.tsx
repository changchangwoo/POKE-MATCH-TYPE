import { css } from "@emotion/react";
import { useState, useEffect } from "react";

interface CoupangBannerProps {
  id?: string;
  template?: string;
  trackingCode?: string;
  subId?: string;
  tsource?: string;
}

const DEVICE_BANNER_SIZES = {
  mobile: { width: "320", height: "140" },
  tablet: { width: "728", height: "140" },
  desktop: { width: "728", height: "140" },
};

export default function CoupangBanner({
  id = "911580",
  template = "carousel",
  trackingCode = "AF8230631",
  subId = "",
  tsource = "",
}: CoupangBannerProps) {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "mobile"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentSize = DEVICE_BANNER_SIZES[deviceType];

  const src = `https://ads-partners.coupang.com/widgets.html?id=${id}&template=${template}&trackingCode=${trackingCode}&subId=${subId}&width=${currentSize.width}&height=${currentSize.height}&tsource=${tsource}`;

  return (
    <div css={BannerContainer}>
      <iframe
        key={`${deviceType}-${currentSize.width}-${currentSize.height}`}
        src={src}
        width={currentSize.width}
        height={currentSize.height}
        referrerPolicy="unsafe-url"
        style={{
          border: "none",
          display: "block", // 명시적으로 block 설정
          flexShrink: 0, // flex 환경에서 축소 방지
        }}
      />
    </div>
  );
}

const BannerContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 넘침 방지 */

  /* 모바일 (0px ~ 767px) */
  @media (max-width: 767px) {
    max-width: 320px;
    min-height: 140px; /* min-height로 변경 */
    margin: 10px auto;
  }

  /* 태블릿 (768px ~ 1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 728px;
    min-height: 90px; /* min-height로 변경 */
    margin: 15px auto;
  }

  /* 데스크탑 (1024px ~) */
  @media (min-width: 1024px) {
    max-width: 728px;
    min-height: 90px; /* min-height로 변경 */
    margin: 20px auto;
  }

  /* iframe 스타일링 - height: auto 제거 */
  iframe {
    max-width: 100%;
    /* height: auto; 제거 - 이게 flex 정렬을 방해했음 */
  }
`;
