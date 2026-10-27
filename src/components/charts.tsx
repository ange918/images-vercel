import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const nf = new Intl.NumberFormat("fr-FR");

/** Number that counts up the first time it scrolls into view. */
export function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setValue(Math.round(to * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref} className="num-tab">
      {prefix}{nf.format(value)}{suffix}
    </span>
  );
}

/** Ring chart: `value` is a percentage. The arc draws itself when the card is revealed. */
export function Donut({ value, label, sub, color = "var(--accent)" }: { value: number; label: string; sub: string; color?: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="donut">
      <svg viewBox="0 0 140 140" role="img" aria-label={`${label} : ${value} %`}>
        <circle cx="70" cy="70" r={r} className="donut-track" />
        <circle
          cx="70" cy="70" r={r} className="donut-arc" stroke={color}
          style={{ "--c": c, "--off": c * (1 - value / 100) } as CSSProperties}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className="donut-value"><CountUp to={value} suffix=" %" /></div>
      <b>{label}</b>
      <small>{sub}</small>
    </div>
  );
}

export type BarDatum = { label: string; sub?: string; value: number };

/** Vertical bar chart with a scale and grid lines. */
export function BarChart({ data, max, unit = "" }: { data: BarDatum[]; max: number; unit?: string }) {
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0];
  return (
    <div className="barchart">
      <div className="plot">
        <div className="scale">{ticks.map((t) => <span key={t}>{nf.format(Math.round(t))}</span>)}</div>
        <div className="area">
          {ticks.map((t) => <i key={t} className="grid-line" style={{ bottom: `${(t / max) * 100}%` }} />)}
          <div className="cols-bars">
            {data.map((d, i) => (
              <div key={d.label} className="col">
                <div className="barbox" style={{ height: `${(d.value / max) * 100}%` }}>
                  <span className="val"><CountUp to={d.value} />{unit}</span>
                  <span className="bar" style={{ "--d": `${i * 120}ms` } as CSSProperties} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="labels">
        {data.map((d) => (
          <div key={d.label}><b>{d.label}</b>{d.sub ? <small>{d.sub}</small> : null}</div>
        ))}
      </div>
    </div>
  );
}

export type HBarDatum = { label: string; taken: number; total: number };

/** Horizontal progress bars: places taken out of the total capacity. */
export function HBars({ data }: { data: HBarDatum[] }) {
  return (
    <ul className="hbars">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="row"><b>{d.label}</b><span>{d.total - d.taken} places restantes sur {d.total}</span></div>
          <div className="track"><span style={{ width: `${(d.taken / d.total) * 100}%`, "--d": `${i * 140}ms` } as CSSProperties} /></div>
        </li>
      ))}
    </ul>
  );
}

export function ChartCard({ title, text, children, className = "" }: { title: string; text?: string; children: ReactNode; className?: string }) {
  return (
    <article className={`chart-card rv ${className}`}>
      <h3>{title}</h3>
      {text ? <p>{text}</p> : null}
      {children}
    </article>
  );
}
