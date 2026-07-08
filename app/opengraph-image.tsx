import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Emir Köroğlu | Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const profileBuffer = await readFile(join(process.cwd(), "public/images/profile.png"));
  const profileSrc = `data:image/png;base64,${profileBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 48,
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0b 0%, #111827 55%, #1e1b4b 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <img
          src={profileSrc}
          alt=""
          width={280}
          height={280}
          style={{
            borderRadius: 32,
            objectFit: "cover",
            objectPosition: "top",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Portfolio
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Emir Köroğlu
          </div>
          <div style={{ fontSize: 34, color: "#cbd5e1" }}>Full Stack Developer</div>
          <div style={{ fontSize: 26, lineHeight: 1.45, color: "#94a3b8" }}>
            Modern, scalable and user-focused web applications.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
