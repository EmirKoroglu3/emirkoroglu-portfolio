import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const iconBuffer = await readFile(join(process.cwd(), "public/images/ek-logo.png"));
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <img
          src={iconSrc}
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
