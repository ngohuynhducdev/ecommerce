import { ImageResponse } from "next/og";

export const alt = "3legant — Furniture Store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated Open Graph card (shown when the site is shared).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#1c1c1c", letterSpacing: -2 }}>
          3legant
          <span style={{ color: "#b88e2f" }}>.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 44, fontWeight: 700, color: "#1c1c1c" }}>
          Simply Unique / Simply Better.
        </div>
        <div style={{ marginTop: 20, fontSize: 28, color: "#6f6c6d" }}>
          Modern furniture &amp; decorations
        </div>
        <div style={{ marginTop: 48, width: 80, height: 6, background: "#b88e2f", borderRadius: 3 }} />
      </div>
    ),
    { ...size },
  );
}
