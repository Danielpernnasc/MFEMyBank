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
    uniqueName: "mfeCadastro",
    publicPath: "http://18.217.92.231/mfe-cadastro/"
    //publicPath: "http://localhost:4201/mfe-cadastro/"
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

      name: "mfeCadastro",
      filename: "remoteEntry.js",

      // ✅ Corrigido aqui
      exposes: {},

      remotes: {
        "shell": "http://18.217.92.231/remoteEntry.js",
        //"shell": "http://localhost:4200/remoteEntry.js",
        "mfeSucesso": "http://18.217.92.231/remoteEntry.js",
        //"mfeSucesso": "http://localhost:4202/remoteEntry.js",
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
