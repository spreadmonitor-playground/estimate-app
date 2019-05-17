/**
 * A basic v4 UUID generator.
 */
export function uuid() {
  return '00000000-0000-4000-8000-000000000000'.replace(/0/g, () => (Math.random() * 16).toString(16)[2]);
}
