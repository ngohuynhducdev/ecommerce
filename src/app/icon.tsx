import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Branded favicon: dark rounded square with a white "3" and gold dot.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1c1c",
          borderRadius: 7,
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        3<span style={{ color: "#b88e2f" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
