module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: ['storybook-addon-specifications', '@storybook/addon-docs'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.node = { fs: 'empty', module: 'empty' };
    return config;
  },
};
