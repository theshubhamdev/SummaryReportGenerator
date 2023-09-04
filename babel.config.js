const presets = ['module:metro-react-native-babel-preset'];

const plugins = [];

plugins.push( [
  'module-resolver',
  {
    root: [ './src' ],
    extensions: [ '.js', '.json', '.gql', '.graphql' ],
    alias: {
      '@': './src',
    },
  },
] );

module.exports = {
  presets,
  plugins,
};
