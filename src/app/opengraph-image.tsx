import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1e2445 0%, #22307a 55%, #2d319b 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#f2e607",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              background: "#f2e607",
              borderRadius: "9999px",
            }}
          />
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "920px",
            }}
          >
            <span>Heavy civil and concrete,</span>
            <span>self-performed.</span>
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#d7dbe4",
              maxWidth: "820px",
              lineHeight: 1.35,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "#b3b8c6",
          }}
        >
          <span>Beaumont, TX · Serving TX &amp; LA since {site.founded}</span>
          <span style={{ color: "#f2e607", fontWeight: 600 }}>
            tcsinc.build
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
