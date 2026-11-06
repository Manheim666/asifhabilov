"use client";

// Clean footage with the pipeline's real tracks drawn on top from data/bee.json.
// A landing starts when an insect's box centre sits inside a flower box, and counts as a visit after 2 seconds.
import { useEffect, useRef, useState } from "react";
import data from "../data/bee.json";
import { asset } from "../data/content";

export default function BeeVisits() {
  const video = useRef(null);
  const root = useRef(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) paused.current = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !paused.current) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(root.current);
    let raf;
    const tick = () => {
      const i = Math.min(Math.floor(v.currentTime * data.fps), data.frames.length - 1);
      setFrame((p) => (p === i ? p : i));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const f = data.frames[frame];
  const toggle = () => {
    const v = video.current;
    paused.current = !v.paused;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  };

  return (
    <div className="bee" ref={root}>
      <div className="bee-stage">
        <video ref={video} muted loop playsInline preload="metadata" width={data.w} height={data.h}
          poster={asset("/assets/video/bee-clean-poster.webp")}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          aria-label="Two honeybees on a yellow flower, each followed by its own tracking box.">
          <source src={asset("/assets/video/bee-clean.mp4")} type="video/mp4" />
        </video>
        <svg viewBox={`0 0 ${data.w} ${data.h}`} aria-hidden="true">
          {f.f.map((b, i) => <rect key={`f${i}`} className="trk-flower" x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} />)}
          {f.i.map(([id, x1, y1, x2, y2, label, dwell, counted]) => (
            <g key={id} className={counted ? "trk counted" : "trk"}>
              <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} />
              <text x={x1} y={Math.max(y1 - 10, 22)}>{`${label} #${id}  ${dwell.toFixed(1)}s`}</text>
              <line x1={x1} x2={x1 + (x2 - x1) * Math.min(dwell / 2, 1)} y1={y2 + 8} y2={y2 + 8} />
            </g>
          ))}
        </svg>
      </div>
      <div className="bee-read">
        <p><b>{f.v}</b> {f.v === 1 ? "visit" : "visits"} counted</p>
        <p className="muted">A box turns yellow once its bee has stayed 2 seconds on the flower. Anything shorter is a fly-past.</p>
        <button type="button" className="btn" onClick={toggle}>{playing ? "Pause the video" : "Play the video"}</button>
      </div>
    </div>
  );
}
