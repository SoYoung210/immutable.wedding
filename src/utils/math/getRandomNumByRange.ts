export default function getRandomNumByRange(min = 0, max: number) {
  return Math.random() * (max - min) + min;
}
