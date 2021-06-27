export function randomId() {
  return `immutable-wedding-${Math.random().toString(36).substr(2, 9)}`;
}
