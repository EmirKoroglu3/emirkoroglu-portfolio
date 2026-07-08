import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          justifyContent: "center",
          background: "#0a0a0b",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <img
          src={profileSrc}
          alt=""
          width={32}
          height={32}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    { ...size },
  );
}
