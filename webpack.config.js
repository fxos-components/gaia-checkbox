module.exports = {
  entry: './src/fxos-checkbox.js',
  output: {
    filename: 'fxos-checkbox.js',
    library: 'FXOSCheckbox',
    libraryTarget: 'umd'
  },

  externals: {
    "fxos-component": {
      root: "fxosComponent",
      commonjs: "fxos-component",
      commonjs2: "fxos-component",
      amd: "fxos-component"
    }
  }
}
