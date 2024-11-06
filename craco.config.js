module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    less: {
      modifyVars: {
        '@primary-color': '#ff5200', // Change primary color
        '@link-color': '#1890ff', // Link color
        '@success-color': '#52c41a', // Success color
        '@error-color': '#f5222d', // Error color
        '@warning-color': '#faad14', // Warning color
        // Add any other Ant Design Less variables you want to modify
      },
      javascriptEnabled: true,
    },
  },
};
