// src/images.js

// Import images using ES Module syntax
import img11 from './11.jpg';
import img12 from './12.jpg';
import img13 from './13.jpg';
import img14 from './14.jpg';
import img15 from './15.jpg';
import img16 from './16.jpg';
import img17 from './17.jpg';
import img18 from './18.jpg';
import img19 from './19.jpg';
import img110 from './110.jpg';
import img111 from './111.jpg';
import img112 from './112.jpg';
import img113 from './113.jpg';
import img114 from './114.jpg';
import img115 from './115.jpg';
import img116 from './116.jpg';
import img117 from './117.jpg';
import close_icon from './close_icon.png'
import img118 from './118.jpg';
import img119 from './119.jpg';
import img120 from './120.jpg';
import img121 from './121.jpg';
import dropdown_icon from './dropdown_icon.png'
import img122 from './122.jpg';
import img123 from './123.jpg';
import return_icon from './return_icon.png';
import logo from './logo.png';
import quality_icon from './quality_icon.png';
import exchange_icon from './exchange_icon.png';

export const images = {
  img11,
  img12,
  img13,
  img14,
  img15,
  logo,
  img16,
  img17,
  close_icon,
  img18,
  img19,
  img110,
  img111,
  img112,
  img113,
  img114,
  img115,
  img116,
  img117,
  img118,
  img119,
  img120,
  img121,
  img122,
  img123,
  exchange_icon,
  return_icon,
  quality_icon,
  dropdown_icon
};

export const products = [
  {
    id: 1,
    name: 'Women Round Neck Cotton Top',
    description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.',
    price: 50,
    image: [images.img11,images.img12,images.img13,images.img14],
    category: 'Women',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L', 'XL'],
    date: 1716634345448,
    bestseller: true,
  },
  {
    id: 2,
    name: 'Casual Men Cotton T-Shirt',
    description: 'A soft and breathable cotton t-shirt, perfect for casual wear and outdoor activities.',
    price: 40,
    image: [images.img12],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    date: 1716634345449,
    bestseller: false,
  },
  {
    id: 3,
    name: 'Unisex Sports Hoodie',
    description: 'A comfortable hoodie made with moisture-wicking fabric, suitable for sports and daily wear.',
    price: 75,
    image: [images.img13],
    category: 'Unisex',
    subCategory: 'Outerwear',
    sizes: ['M', 'L', 'XL', 'XXL'],
    date: 1716634345450,
    bestseller: true,
  },
  {
    id: 4,
    name: 'Women Floral Print Dress',
    description: 'A beautiful floral print dress made with lightweight fabric, perfect for summer outings.',
    price: 120,
    image: [images.img14],
    category: 'Women',
    subCategory: 'Dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    date: 1716634345451,
    bestseller: false,
  },
  {
    id: 5,
    name: 'Men Formal Shirt',
    description: 'A slim-fit formal shirt made of premium cotton, suitable for office and events.',
    price: 60,
    image: [images.img15],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['M', 'L', 'XL'],
    date: 1716634345452,
    bestseller: false,
  },
  {
    id: 6,
    name: 'Women Lightweight Jacket',
    description: 'A stylish and lightweight jacket for cool evenings.',
    price: 100,
    image: [images.img16],
    category: 'Women',
    subCategory: 'Outerwear',
    sizes: ['S', 'M', 'L'],
    date: 1716634345453,
    bestseller: true,
  },
  {
    id: 7,
    name: 'Unisex Workout Shorts',
    description: 'Comfortable workout shorts with quick-dry fabric for all genders.',
    price: 30,
    image: [images.img17],
    category: 'Unisex',
    subCategory: 'Bottomwear',
    sizes: ['S', 'M', 'L', 'XL'],
    date: 1716634345454,
    bestseller: true,
  },
  {
    id: 8,
    name: 'Women Casual Sneakers',
    description: 'Lightweight and stylish sneakers for casual and outdoor activities.',
    price: 80,
    image: [images.img18],
    category: 'Women',
    subCategory: 'Footwear',
    sizes: ['5', '6', '7', '8', '9'],
    date: 1716634345455,
    bestseller: false,
  },
  {
    id: 9,
    name: 'Men Leather Boots',
    description: 'Durable leather boots for formal and semi-formal occasions.',
    price: 150,
    image: [images.img19],
    category: 'Men',
    subCategory: 'Footwear',
    sizes: ['8', '9', '10', '11'],
    date: 1716634345456,
    bestseller: true,
  },
  {
    id: 10,
    name: 'Women Lightweight Jacket',
    description: 'A stylish and lightweight jacket for cool evenings.',
    price: 100,
    image: [images.img16],
    category: 'Women',
    subCategory: 'Outerwear',
    sizes: ['S', 'M', 'L'],
    date: 1716634345453,
    bestseller: true,
  },
  {
    id: 11,
    name: 'Unisex Workout Shorts',
    description: 'Comfortable workout shorts with quick-dry fabric for all genders.',
    price: 30,
    image: [images.img17],
    category: 'Unisex',
    subCategory: 'Bottomwear',
    sizes: ['S', 'M', 'L', 'XL'],
    date: 1716634345454,
    bestseller: true,
  },
  {
    id: 12,
    name: 'Women Casual Sneakers',
    description: 'Lightweight and stylish sneakers for casual and outdoor activities.',
    price: 80,
    image: [images.img18],
    category: 'Women',
    subCategory: 'Footwear',
    sizes: ['5', '6', '7', '8', '9'],
    date: 1716634345455,
    bestseller: false,
  },
  {
    id: 13,
    name: 'Men Leather Boots',
    description: 'Durable leather boots for formal and semi-formal occasions.',
    price: 150,
    image: [images.img19],
    category: 'Men',
    subCategory: 'Footwear',
    sizes: ['8', '9', '10', '11'],
    date: 1716634345456,
    bestseller: true,
  },
];