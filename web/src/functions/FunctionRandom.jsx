export default function generadorRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}