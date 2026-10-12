import { cp, readFile, rm, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(root, 'src');
const output = resolve(root, 'out');
async function requireResource(name) {
  const path = resolve(source, name);
  if (relative(source, path).startsWith('..')) throw new Error(`Resource escapes src/: ${name}`);
  try {
    if (!(await stat(path)).isFile() || !(await stat(path)).size) throw new Error('Empty or not a file');
  } catch (error) { throw new Error(`Missing required resource src/${name}: ${error.message}`); }
}
try {
  for (const name of ['index.html', 'styles.css', 'theme.js']) await requireResource(name);
  for (const name of ['index.html', 'styles.css']) {
    const text = await readFile(resolve(source, name), 'utf8');
    const resources = name.endsWith('.html')
      ? [...text.matchAll(/<(a|img|script|link)\b[^>]*?\b(src|href)="([^"]+)"/g)].map(m => ({ value: m[3], outbound: m[1] === 'a' && m[2] === 'href' }))
      : [...text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m => ({ value: m[1], outbound: false }));
    for (const { value: resource, outbound } of resources) {
      if (/^(https?:|mailto:|#)/.test(resource)) {
        if (!outbound) throw new Error(`Nonlocal resource in ${name}: ${resource}`);
        continue;
      }
      await requireResource(resource);
    }
  }
  for (const name of ['fraunces-OFL.txt', 'instrumentsans-OFL.txt', 'ibmplexmono-OFL.txt'])
    await requireResource(`assets/fonts/${name}`);
  // Validate before replacing only the generated output directory.
  await rm(output, { recursive: true, force: true });
  await cp(source, output, { recursive: true, dereference: false, filter: async path => {
    if ((await stat(path)).isDirectory()) return true;
    return ['.html', '.css', '.js', '.svg', '.png', '.jpeg', '.woff2', '.txt'].includes(extname(path));
  } });
  console.log(`Built ${relative(root, output)}/ from src/`);
} catch (error) { console.error(`Build failed: ${error.message}`); process.exitCode = 1; }
