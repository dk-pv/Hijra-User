/**
 * Balanced justified rows: split photos (in order) into rows whose summed aspect ratio is close to `target`
 * (row width ÷ wanted row height), so no row is crammed and no photo is left alone at the end.
 * Rows that come out too squat (sum above target) cost three times as much: tall rows read better than tiny thumbnails.
 * `first` lets the opening row aim elsewhere (one wide lead photo on phones, then pairs).
 * Returns the end index (exclusive) of every row; the last entry is ratios.length.
 */
export function rowEnds(ratios: number[], target: number, first = target): number[] {
  const n = ratios.length;
  const best: number[] = [0];
  const from: number[] = [0];
  for (let j = 1; j <= n; j++) {
    best[j] = Infinity;
    let sum = 0;
    for (let i = j - 1; i >= 0; i--) {
      sum += ratios[i];
      const t = i === 0 ? first : target;
      const miss = Math.log(sum / t) ** 2 * (sum > t ? 3 : 1);
      if (best[i] + miss < best[j]) {
        best[j] = best[i] + miss;
        from[j] = i;
      }
    }
  }
  const ends: number[] = [];
  for (let j = n; j > 0; j = from[j]) ends.unshift(j);
  return ends;
}
