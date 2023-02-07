import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export function _require() {
  return require;
}

export async function foo() {
  const { a } = await import('./bar-import');
  console.log(a);
}
