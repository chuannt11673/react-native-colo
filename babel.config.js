module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@screens": "./app/screens",
          "@components": "./app/components",
          "@shared": "./app/shared",
          "@assets": "./assets",
          "@stores": "./app/stores"
        }
      }
    ]
  ]
};
