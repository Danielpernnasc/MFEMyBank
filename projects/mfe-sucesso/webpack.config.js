const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]
);

module.exports = {
  output: {
    uniqueName: "mfeSucesso",
    publicPath: "http://3.19.123.139/mfe-sucesso/"
    //publicPath: "http://localhost:4202/mfe-sucesso/"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      name: "mfeSucesso",
      filename: "remoteEntry.js",
      exposes: {},

      remotes: {
        //"shell": "http://localhost:4200/remoteEntry.js",
        "shell": "http://3.19.123.139/remoteEntry.js",
        //"mfeCadastro": "http://localhost:4201/remoteEntry.js"
        "mfeCadastro": "http://3.19.123.139/remoteEntry.js",
      },

      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};
