import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Prime Ride — Electric Bikes & Motorcycles in Miami";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "#ffb400",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            PRIME / RIDE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#f5f5f7",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Electric rides,
          </span>
          <span
            style={{
              color: "#f5f5f7",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            built for Miami.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#a1a1aa",
            fontSize: 30,
          }}
        >
          <span>Strike Cycles &middot; HappyRun</span>
          <span>prime-ride.net</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
