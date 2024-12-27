const images = {};

// Dynamically import all images from the assets folder
const requireContext = require.context('./', false, /\.(png|jpe?g|svg)$/);

requireContext.keys().forEach((fileName) => {
  const imageName = fileName.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
  images[imageName] = requireContext(fileName);
});

export { images };