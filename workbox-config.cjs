module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,json,js,css,png,jpg,svg}'],
  swDest: 'dist/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 50 },
      },
    },
  ],
};
