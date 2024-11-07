require("dotenv").config();

const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    users: `${process.env.APP_USERS_URL}/remoteEntry.js`,
    products: `${process.env.APP_PRODS_URL}/remoteEntry.js`,
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
