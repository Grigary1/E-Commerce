import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import productModel from '../models/productModel.js';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URL;

// Static lists
const categories   = ['men', 'women', 'kids', 'accessories'];
const brands       = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Generic'];
const sizes        = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors       = ['Red', 'Blue', 'Green', 'Black', 'White'];

const imagePool = [
  "https://images.unsplash.com/photo-1585282283405-c6fdbf7fe172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4ODQxMDczfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1615397476330-f52c814c828b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw4ODQxMDczfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1555992644-5240d9269aaf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw4ODQxMDczfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1602546005687-372f3c6455ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8ODg0MTA3M3x8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1601974057527-d1ec39200df5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4ODQxMDczfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1561398049-3f8467c32a6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4ODQxMDczfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1514471334649-46a684fb05c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8ODg0MTA3M3x8ZW58MHx8fHx8"
];


// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected:', MONGO_URI);
  } catch (err) {
    console.error('❌ Failed to connect:', err.message);
    process.exit(1);
  }
}

// Generate random product variants
function generateVariants() {
  const count = faker.number.int({ min: 1, max: 4 });
  return Array.from({ length: count }).map(() => ({
    sku:   faker.string.uuid(),
    size:  faker.helpers.arrayElement(sizes),
    color: faker.helpers.arrayElement(colors),
    price: Number(faker.commerce.price({ min: 100, max: 2000 })),
    stock: faker.number.int({ min: 0, max: 100 }),
  }));
}

// Return a real fashion image from LoremFlickr
function getRandomImageUrl() {
  return faker.helpers.arrayElement(imagePool);
}


// Main seed function
async function seed() {
  await connectDB();

  // Generate 50 products
  const products = Array.from({ length: 50 }).map(() => ({
    title:       faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category:    faker.helpers.arrayElement(categories),
    subCategory: faker.commerce.department(),
    brand:       faker.helpers.arrayElement(brands),
    tags:        faker.lorem.words(3).split(' '),
    // 1 base + 2 extra real images
    baseImage:   getRandomImageUrl(),
    images: [
      getRandomImageUrl(),
      getRandomImageUrl()
    ],
    variants:    generateVariants(),
    isBestSeller: faker.datatype.boolean(),
  }));

  // Insert into DB
  await productModel.insertMany(products);
  console.log(`✅ Seeded ${products.length} products`);

  await mongoose.disconnect();
  console.log('🔌 MongoDB disconnected');
}

// Run the script
seed().catch(err => console.error('❌ Seeding error:', err));
