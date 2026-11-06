"use client";

// Rows are the true class, columns the model's answer.
import { useState } from "react";

export default function Confusion({ classes, matrix, title, noun, start = [0, 1] }) {
  const [[r, c], set] = useState(start);
  const n = matrix[r][c];
  const rowTotal = matrix[r].reduce((a, b) => a + b, 0);
  const share = (n / rowTotal) * 100;
  return (
    <div className="cm">
      <h4>{title}</h4>
      <div className="cm-grid" style={{ "--n": classes.length }}>
        <span />
        {classes.map((k) => <span className="cm-col" key={k}>{k}</span>)}
        {matrix.map((row, i) => [
          <span className="cm-row" key={`r${i}`}>{classes[i]}</span>,
          ...row.map((v, j) => {
            const s = v / matrix[i].reduce((a, b) => a + b, 0);
            return (
              <button
                type="button"
                key={`${i}-${j}`}
                className={i === r && j === c ? "sel" : ""}
                style={{ "--s": Math.pow(s, 0.55) }}
                aria-label={`True ${classes[i]}, predicted ${classes[j]}: ${v}`}
                onMouseEnter={() => set([i, j])}
                onFocus={() => set([i, j])}
                onClick={() => set([i, j])}
              >{v.toLocaleString("en-US")}</button>
            );
          }),
        ])}
      </div>
      <p className="cm-read" aria-live="polite">
        {r === c ? (
          <><b>{n.toLocaleString("en-US")}</b> of {rowTotal.toLocaleString("en-US")} {classes[r].toLowerCase()} {noun} were called correctly, {share.toFixed(0)}%.</>
        ) : (
          <><b>{n}</b> of {rowTotal.toLocaleString("en-US")} {classes[r].toLowerCase()} {noun} were called {classes[c].toLowerCase()}, {share.toFixed(1)}%.</>
        )}
      </p>
    </div>
  );
}
