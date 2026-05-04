"use client";

import { useEffect } from "react";
import * as d3Geo from "d3-geo";
import * as topojson from "topojson-client";

interface WorldDotMapProps {
  /** Called once the canvas has been rendered and converted to a PNG data URL */
  onReady: (dataUrl: string) => void;
  /** Dot color — defaults to near-black #1c1c1c */
  dotColor?: string;
  /** Dot radius in px — defaults to 1.3 */
  dotRadius?: number;
  /** Grid spacing between dots in px — defaults to 4 */
  dotSpacing?: number;
  /** Internal canvas width — higher = sharper, slower — defaults to 1200 */
  canvasWidth?: number;
  /** Internal canvas height — defaults to 600 */
  canvasHeight?: number;
}

/**
 * WorldDotMap
 *
 * A headless component: renders nothing in the DOM.
 * It generates a world dot-map on an offscreen canvas and fires `onReady`
 * with the resulting PNG data URL, which the parent can embed anywhere
 * (e.g. as an SVG <image> tag or a CSS background-image).
 *
 * Usage:
 *   <WorldDotMap onReady={(url) => setMapDataUrl(url)} dotColor="#1c1c1c" />
 */
export default function WorldDotMap({
  onReady,
  dotColor = "#1c1c1c",
  dotRadius = 1.3,
  dotSpacing = 4,
  canvasWidth = 1200,
  canvasHeight = 600,
}: WorldDotMapProps) {
  useEffect(() => {
    let cancelled = false;

    const generate = async () => {
      try {
        const W = canvasWidth;
        const H = canvasHeight;

        // 1. Fetch TopoJSON land data
        const response = await fetch(
          "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
        );
        const world = await response.json();
        const land = (topojson as any).feature(world, world.objects.land);

        if (cancelled) return;

        // 2. Rasterise land onto an offscreen mask canvas
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = W;
        maskCanvas.height = H;
        const mCtx = maskCanvas.getContext("2d", { willReadFrequently: true })!;

        const projection = d3Geo
          .geoEquirectangular()
          .fitSize([W, H], land as any);
        const pathGen = d3Geo.geoPath(projection, mCtx);

        mCtx.fillStyle = "#000";
        mCtx.beginPath();
        pathGen(land as any);
        mCtx.fill();

        const imageData = mCtx.getImageData(0, 0, W, H).data;

        if (cancelled) return;

        // 3. Draw dots on the output canvas wherever land pixels exist
        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        for (let y = 0; y < H; y += dotSpacing) {
          for (let x = 0; x < W; x += dotSpacing) {
            if (imageData[(y * W + x) * 4 + 3] > 128) {
              ctx.moveTo(x, y);
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            }
          }
        }
        ctx.fill();

        if (!cancelled) {
          onReady(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        console.error("[WorldDotMap] Failed to generate map:", err);
      }
    };

    generate();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotColor, dotRadius, dotSpacing, canvasWidth, canvasHeight]);

  // Headless — renders nothing
  return null;
}