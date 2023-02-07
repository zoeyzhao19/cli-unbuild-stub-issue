import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createRequire } from 'module';
import { transformAsync } from '@babel/core';

const require = createRequire(import.meta.url);

const filePath = path.resolve(fileURLToPath(import.meta.url), '../foo.ts');
const content = fs.readFileSync(filePath, 'utf8');
const result = await transformAsync(content, {
  sourceType: 'module',
  plugins: [
    [
      require('@babel/plugin-transform-modules-commonjs'),
      { allowTopLevelThis: true, noInterop: true },
    ],
    [require('babel-plugin-dynamic-import-node'), { noInterop: true }],
    [require('@babel/plugin-proposal-dynamic-import')],
  ],
});
console.log(result?.code);
