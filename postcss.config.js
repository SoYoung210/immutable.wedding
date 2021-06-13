module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        stage: 0,
        features: {
          'nesting-rules': true,
        },
        importFrom: ['./src/style/style.scss'],
        autoprefixer: {
          env: 'defaults", "not IE < 11',
          grid: 'autoplace',
        },
      },
    ],
    'cssnano',
    'tailwindcss',
  ],
};
