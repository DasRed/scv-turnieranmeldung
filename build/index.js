import esbuild from 'esbuild';
import clear from 'esbuild-plugin-clear';
import time from 'esbuild-plugin-time';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

await esbuild.build({
    entryPoints:   [__dirname + '/../src/ui/index.js'],
    bundle:        true,
    minify:        false,
    platform:      'node',
    sourcemap:     false,
    target:        ['esnext'],
    format:        'esm',
    legalComments: 'none',
    outfile:       __dirname + '/../dist/ui/index.mjs',
    plugins:       [
        clear(__dirname + '/../dist/ui'),
        time(),
    ],
});
