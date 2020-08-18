export const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 85, b: 85 } },
  { pct: 0.5, color: { r: 85, g: 85, b: 0xff } },
  { pct: 1.0, color: { r: 85, g: 0xcc, b: 0xcc } }];

export const getColorForPercentage = (pct) => {
  let i;
  for (i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  const lower = percentColors[i - 1];
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return `rgb(${[color.r, color.g, color.b].join(',')})`;
};
