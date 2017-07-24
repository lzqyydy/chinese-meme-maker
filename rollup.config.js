// Rollup plugins
import postcss from 'rollup-plugin-postcss';
mport replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// PostCSS plugins
import cssnano from 'cssnano';

// PostCSS pre-processor
const preprocessor = (content, id) => new Promise((resolve, reject) => {
  renderer.render((err, code) => {
    if (err) {
      return reject(err);
    }
    resolve({code, map: renderer.sourcemap});
  });
});

export default {
  entry: 'src/main.js',
  dest: 'bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    postcss({
      plugins: [
        cssnano()
      ],
      preprocessor,
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
