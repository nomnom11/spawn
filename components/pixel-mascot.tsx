const ROWS = [
  "...XXXXX...",
  "..XXXXXXX..",
  ".XXXXXXXXX.",
  ".XXXXXXXXX.",
  ".XXXXXXXXX.",
  "..XXXXXXX..",
  ".XX.XXX.XX.",
  "XX.XX.XX.XX",
  "X..X...X..X",
];

const EYES: [number, number][] = [
  [3, 2],
  [3, 3],
  [7, 2],
  [7, 3],
];

const isEye = (x: number, y: number) => EYES.some(([ex, ey]) => ex === x && ey === y);

export default function PixelMascot() {
  const body: { x: number; y: number }[] = [];
  ROWS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "X" && !isEye(x, y)) body.push({ x, y });
    }
  });

  return (
    <svg
      id="mascot"
      viewBox="0 0 11 9"
      shapeRendering="crispEdges"
      role="img"
      aria-label="spawn mascot"
    >
      {body.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
      ))}
      {EYES.map(([x, y]) => (
        <rect key={`eye-${x}-${y}`} className="eye" x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  );
}
