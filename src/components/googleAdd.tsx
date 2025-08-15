import React, { useEffect } from "react";

interface GoogleAdsenseHorizontalProps {
  adClient?: string;
  adSlot?: string;
  style?: React.CSSProperties;
  format?: string;
  fullWidthResponsive?: boolean;
}

const GoogleAdsenseHorizontal: React.FC<GoogleAdsenseHorizontalProps> = ({
  adClient = "ca-pub-9488712450371317",
  adSlot = "1498772082",
  style = { display: "block", backgroundColor: "orange", position: "relative" },
  format = "auto",
  fullWidthResponsive = true,
}) => {
  useEffect(() => {
    try {
      // @ts-ignore - adsbygoogle is loaded by Google's script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
};

export { GoogleAdsenseHorizontal };
