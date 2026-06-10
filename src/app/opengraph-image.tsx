import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt = "3legant — Modern Furniture Store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1C1C1C",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 600 }}>
          3legant
          <span style={{ color: "#B88E2F" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          <span>Simply Unique.</span>
          <span>Simply Better.</span>
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: "#9CA3AF", maxWidth: 820 }}>
          {SITE_DESCRIPTION}
        </div>

        <div
          style={{
            marginTop: 40,
            alignSelf: "flex-start",
            background: "#B88E2F",
            color: "#1C1C1C",
            fontSize: 26,
            fontWeight: 600,
            padding: "14px 32px",
            borderRadius: 999,
          }}
        >
          Shop the collection →
        </div>
      </div>
    ),
    size,
  );
}
