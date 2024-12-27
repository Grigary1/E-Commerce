const images = {};

// Use import.meta.glob to dynamically import all images
const importAll = import.meta.glob('./assets/*.{png,jpg,jpeg,svg}', { eager: true });

Object.keys(importAll).forEach((key) => {
  const fileName = key.replace('./assets/', ''); // Remove the folder path
  images[fileName] = importAll[key].default; // Add the imported image to the object
});

export const assets = images;
