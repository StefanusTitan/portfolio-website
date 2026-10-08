import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import styles from "./Schematic.module.css";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Below this container width the grid is transposed so the flow reads top to bottom.
const VERTICAL_BELOW = 600;
const STEP = 0.14;
const RADIUS = 8;

// Distance from the first node(s), used to stagger the draw-in along the flow.
function depths(nodes, edges) {
  const incoming = new Set(edges.map((e) => e.to));
  const depth = {};
  const queue = nodes.filter((n) => !incoming.has(n.id)).map((n) => n.id);
  queue.forEach((id) => (depth[id] = 0));
  while (queue.length) {
    const id = queue.shift();
    edges
      .filter((e) => e.from === id && depth[e.to] === undefined)
      .forEach((e) => {
        depth[e.to] = depth[id] + 1;
        queue.push(e.to);
      });
  }
  nodes.forEach((n) => (depth[n.id] ??= 0));
  return depth;
}

function roundedPath(points) {
  if (points.length === 2) {
    const [a, b] = points;
    return `M${a.x},${a.y}L${b.x},${b.y}`;
  }
  const [a, corner, b] = points;
  const r = Math.min(
    RADIUS,
    Math.hypot(corner.x - a.x, corner.y - a.y) / 2,
    Math.hypot(b.x - corner.x, b.y - corner.y) / 2
  );
  const towards = (from, to, dist) => {
    const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    return { x: from.x + ((to.x - from.x) / len) * dist, y: from.y + ((to.y - from.y) / len) * dist };
  };
  const p1 = towards(corner, a, r);
  const p2 = towards(corner, b, r);
  return `M${a.x},${a.y}L${p1.x},${p1.y}Q${corner.x},${corner.y} ${p2.x},${p2.y}L${b.x},${b.y}`;
}

function routeEdge(a, b, route) {
  const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  let points;

  if (Math.abs(ac.y - bc.y) < 2) {
    points = bc.x > ac.x ? [{ x: a.x + a.w, y: ac.y }, { x: b.x, y: bc.y }] : [{ x: a.x, y: ac.y }, { x: b.x + b.w, y: bc.y }];
  } else if (Math.abs(ac.x - bc.x) < 2) {
    points = bc.y > ac.y ? [{ x: ac.x, y: a.y + a.h }, { x: bc.x, y: b.y }] : [{ x: ac.x, y: a.y }, { x: bc.x, y: b.y + b.h }];
  } else if (route === "hv") {
    const start = { x: bc.x > ac.x ? a.x + a.w : a.x, y: ac.y };
    points = [start, { x: bc.x, y: ac.y }, { x: bc.x, y: bc.y > ac.y ? b.y : b.y + b.h }];
  } else {
    const start = { x: ac.x, y: bc.y > ac.y ? a.y + a.h : a.y };
    points = [start, { x: ac.x, y: bc.y }, { x: bc.x > ac.x ? b.x : b.x + b.w, y: bc.y }];
  }

  // Leave a small gap before the target so the arrowhead doesn't touch the border.
  const end = points[points.length - 1];
  const prev = points[points.length - 2];
  const len = Math.hypot(end.x - prev.x, end.y - prev.y) || 1;
  const ux = (end.x - prev.x) / len;
  const uy = (end.y - prev.y) / len;
  const tip = { x: end.x - ux * 3, y: end.y - uy * 3 };
  points[points.length - 1] = tip;

  const size = 6;
  const arrow = [
    `${tip.x},${tip.y}`,
    `${tip.x - ux * size - uy * size * 0.6},${tip.y - uy * size + ux * size * 0.6}`,
    `${tip.x - ux * size + uy * size * 0.6},${tip.y - uy * size - ux * size * 0.6}`,
  ].join(" ");

  // Label sits on the longest segment: above it when horizontal, beside it when vertical.
  let longest = [points[0], points[1]];
  for (let i = 1; i < points.length - 1; i++) {
    const seg = [points[i], points[i + 1]];
    const l = (s) => Math.hypot(s[1].x - s[0].x, s[1].y - s[0].y);
    if (l(seg) > l(longest)) longest = seg;
  }
  const horizontal = Math.abs(longest[0].y - longest[1].y) < 1;
  const label = {
    x: (longest[0].x + longest[1].x) / 2 + (horizontal ? 0 : 7),
    y: (longest[0].y + longest[1].y) / 2 + (horizontal ? -7 : 4),
    anchor: horizontal ? "middle" : "start",
  };

  return { d: roundedPath(points), arrow, label };
}

export default function Schematic({ diagram, title }) {
  const box = useRef(null);
  const nodeEls = useRef({});
  const verticalRef = useRef(false);
  const [vertical, setVertical] = useState(false);
  const [geometry, setGeometry] = useState(null);
  const inView = useInView(box, { once: true, amount: 0.35 });

  const { nodes, edges } = diagram;
  const depth = useMemo(() => depths(nodes, edges), [nodes, edges]);
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;

  const measure = useCallback(() => {
    const el = box.current;
    if (!el || el.clientWidth === 0) return;
    const nextVertical = el.clientWidth < VERTICAL_BELOW;
    if (nextVertical !== verticalRef.current) {
      verticalRef.current = nextVertical;
      setVertical(nextVertical);
      return;
    }
    // offsetLeft/Top ignore transforms, so the entrance animation can't skew the routes.
    const rects = {};
    for (const n of nodes) {
      const node = nodeEls.current[n.id];
      if (!node) return;
      rects[n.id] = { x: node.offsetLeft, y: node.offsetTop, w: node.offsetWidth, h: node.offsetHeight };
    }
    setGeometry({
      width: el.clientWidth,
      height: el.clientHeight,
      edges: edges.map((e) => {
        const route = nextVertical ? (e.route === "hv" ? "vh" : e.route === "vh" ? "hv" : e.route) : e.route;
        return routeEdge(rects[e.from], rects[e.to], route);
      }),
    });
  }, [nodes, edges]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure, vertical]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(el);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  const gridCols = vertical ? rows : cols;
  const show = inView && geometry;

  return (
    <figure className={styles.figure}>
      <div
        ref={box}
        className={styles.grid}
        data-vertical={vertical || undefined}
        data-cols={gridCols}
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {nodes.map((n) => (
          <motion.div
            key={n.id}
            ref={(el) => (nodeEls.current[n.id] = el)}
            className={styles.node}
            data-kind={n.kind || "step"}
            style={{ gridColumn: (vertical ? n.row : n.col) + 1, gridRow: (vertical ? n.col : n.row) + 1 }}
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: depth[n.id] * STEP }}
          >
            <span className={styles.label}>{n.label}</span>
            {n.sub && <span className={styles.sub}>{n.sub}</span>}
          </motion.div>
        ))}

        {geometry && (
          <svg className={styles.wires} width={geometry.width} height={geometry.height} aria-hidden="true">
            {edges.map((e, i) => {
              const g = geometry.edges[i];
              const delay = depth[e.from] * STEP + 0.12;
              // Dashed edges can't be drawn with pathLength (it owns the dash array), so they fade in.
              const hidden = e.kind === "alt" ? { opacity: 0 } : { pathLength: 0 };
              const drawn = e.kind === "alt" ? { opacity: 1 } : { pathLength: 1 };
              return (
                <g key={`${e.from}-${e.to}`} className={styles.edge} data-kind={e.kind}>
                  <motion.path
                    d={g.d}
                    initial={hidden}
                    animate={show ? drawn : undefined}
                    transition={{ duration: 0.32, ease: "easeInOut", delay }}
                  />
                  <motion.polygon
                    points={g.arrow}
                    initial={{ opacity: 0 }}
                    animate={show ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.12, delay: delay + 0.28 }}
                  />
                  {e.label && (
                    <motion.text
                      x={g.label.x}
                      y={g.label.y}
                      textAnchor={g.label.anchor}
                      initial={{ opacity: 0 }}
                      animate={show ? { opacity: 1 } : undefined}
                      transition={{ duration: 0.2, delay: delay + 0.2 }}
                    >
                      {e.label}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
      {title && <figcaption className="visually-hidden">{title}</figcaption>}
    </figure>
  );
}
