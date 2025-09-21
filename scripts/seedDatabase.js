// // /scripts/seedDatabase.js
// import connect from '@/lib/mongo';
// import Product from '@/model/Product.js'; // Ensure .js extension for direct node/tsx execution
// import BOM from '@/model/BOM.js'; // Ensure .js extension
// import StockLedger from '@/model/StockLedgerEntry.js';
// // import dotenv from 'dotenv';
// // dotenv.config({ path: './.env.local' });

// const seedData = async () => {
//   try {
//     await connect();
    
//     // Clear existing data (optional - remove in production)
//     await Product.deleteMany({});
//     await BOM.deleteMany({});
//     await StockLedger.deleteMany({});
    
//     console.log('Creating products...');
    
//     // Create finished products
//     const finishedProducts = await Product.create([
//       { name: "Dining Table", unitOfMeasure: "pcs", productType: "finished" },
//       { name: "Office Chair", unitOfMeasure: "pcs", productType: "finished" },
//       { name: "Coffee Table", unitOfMeasure: "pcs", productType: "finished" },
//       { name: "Bookshelf", unitOfMeasure: "pcs", productType: "finished" },
//       { name: "Wardrobe", unitOfMeasure: "pcs", productType: "finished" },
//       { name: "Study Desk", unitOfMeasure: "pcs", productType: "finished" }
//     ]);
    
//     // Create component/raw materials
//     const components = await Product.create([
//       { name: "Wood Panel", unitOfMeasure: "sq ft", productType: "raw_material" },
//       { name: "Table Legs", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Screws", unitOfMeasure: "pcs", productType: "raw_material" },
//       { name: "Wood Finish", unitOfMeasure: "ltr", productType: "raw_material" },
//       { name: "Chair Base", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Seat Cushion", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Armrests", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Wheels", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Metal Frame", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Glass Top", unitOfMeasure: "pcs", productType: "component" },
//       { name: "Hinges", unitOfMeasure: "pcs", productType: "raw_material" },
//       { name: "Handles", unitOfMeasure: "pcs", productType: "raw_material" }
//     ]);
    
//     console.log('Creating BOMs...');
    
//     // Create BOMs
//     const boms = await BOM.create([
//       {
//         name: "Dining Table BOM",
//         product: finishedProducts[0]._id, // Dining Table
//         components: [
//           { product: components[0]._id, quantity: 4 },    // Wood Panel
//           { product: components[1]._id, quantity: 4 },    // Table Legs
//           { product: components[2]._id, quantity: 16 },   // Screws
//           { product: components[3]._id, quantity: 0.5 }   // Wood Finish
//         ]
//       },
//       {
//         name: "Office Chair BOM",
//         product: finishedProducts[1]._id, // Office Chair
//         components: [
//           { product: components[4]._id, quantity: 1 },    // Chair Base
//           { product: components[5]._id, quantity: 1 },    // Seat Cushion
//           { product: components[6]._id, quantity: 2 },    // Armrests
//           { product: components[7]._id, quantity: 5 }     // Wheels
//         ]
//       },
//       {
//         name: "Coffee Table BOM",
//         product: finishedProducts[2]._id, // Coffee Table
//         components: [
//           { product: components[0]._id, quantity: 2 },    // Wood Panel
//           { product: components[1]._id, quantity: 4 },    // Table Legs
//           { product: components[9]._id, quantity: 1 },    // Glass Top
//           { product: components[2]._id, quantity: 12 }    // Screws
//         ]
//       },
//       {
//         name: "Bookshelf BOM",
//         product: finishedProducts[3]._id, // Bookshelf
//         components: [
//           { product: components[0]._id, quantity: 6 },    // Wood Panel
//           { product: components[2]._id, quantity: 24 },   // Screws
//           { product: components[3]._id, quantity: 1 }     // Wood Finish
//         ]
//       }
//     ]);
    
//     console.log('Creating stock entries...');
    
//     // Create stock entries for all products
//     const allProducts = [...finishedProducts, ...components];
//     const stockEntries = [];
    
//     for (const product of allProducts) {
//       stockEntries.push({
//         product: product._id,
//         quantityOnHand: Math.floor(Math.random() * 100) + 10, // Random stock between 10-110
//         quantityReserved: 0,
//         averageCost: Math.floor(Math.random() * 50) + 5, // Random cost between 5-55
//         location: 'MAIN-WAREHOUSE'
//       });
//     }
    
//     await StockLedger.create(stockEntries);
    
//     console.log('Database seeded successfully!');
//     console.log(`Created ${finishedProducts.length} finished products`);
//     console.log(`Created ${components.length} components/raw materials`);
//     console.log(`Created ${boms.length} BOMs`);
//     console.log(`Created ${stockEntries.length} stock entries`);
    
//   } catch (error) {
//     console.error('Seeding error:', error);
//   }
// };

// // Run if called directly
// // if (process.argv[1] === new URL(import.meta.url).pathname) {
// //   seedData().then(() => process.exit(0));
// // }
// // Always run when executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   seedData()
//     .then(() => {
//       console.log("✅ Database seeding finished");
//       process.exit(0);
//     })
//     .catch((err) => {
//       console.error("❌ Seeding failed:", err);
//       process.exit(1);
//     });
// }

// export default seedData;
// /scripts/seedDatabase.js
import connect from '../lib/mongo.js';
import Product from '../model/Product.js';
import BOM from '../model/BOM.js';
import StockLedger from '../model/StockLedgerEntry.js';

const seedData = async () => {
  try {
    await connect();

    await Product.deleteMany({});
    await BOM.deleteMany({});
    await StockLedger.deleteMany({});

    console.log('Creating products...');

    const finishedProducts = await Product.create([
      {code: "PRD001", name: "Dining Table", unitOfMeasure: "pcs", productType: "finished" },
      {code: "PRD002", name: "Office Chair", unitOfMeasure: "pcs", productType: "finished" },
      {code: "PRD003", name: "Coffee Table", unitOfMeasure: "pcs", productType: "finished" },
      {code: "PRD004", name: "Bookshelf", unitOfMeasure: "pcs", productType: "finished" },
      {code: "PRD005", name: "Wardrobe", unitOfMeasure: "pcs", productType: "finished" },
      {code: "PRD006", name: "Study Desk", unitOfMeasure: "pcs", productType: "finished" }
    ]);

    const components = await Product.create([
      { name: "Wood Panel", unitOfMeasure: "sq ft", productType: "raw_material" },
      { name: "Table Legs", unitOfMeasure: "pcs", productType: "component" },
      { name: "Screws", unitOfMeasure: "pcs", productType: "raw_material" },
      { name: "Wood Finish", unitOfMeasure: "ltr", productType: "raw_material" },
      { name: "Chair Base", unitOfMeasure: "pcs", productType: "component" },
      { name: "Seat Cushion", unitOfMeasure: "pcs", productType: "component" },
      { name: "Armrests", unitOfMeasure: "pcs", productType: "component" },
      { name: "Wheels", unitOfMeasure: "pcs", productType: "component" },
      { name: "Metal Frame", unitOfMeasure: "pcs", productType: "component" },
      { name: "Glass Top", unitOfMeasure: "pcs", productType: "component" },
      { name: "Hinges", unitOfMeasure: "pcs", productType: "raw_material" },
      { name: "Handles", unitOfMeasure: "pcs", productType: "raw_material" }
    ]);

    console.log('Creating BOMs...');

    const boms = await BOM.create([
      {
        name: "Dining Table BOM",
        product: finishedProducts[0]._id,
        components: [
          { product: components[0]._id, quantity: 4 },
          { product: components[1]._id, quantity: 4 },
          { product: components[2]._id, quantity: 16 },
          { product: components[3]._id, quantity: 0.5 }
        ]
      },
      {
        name: "Office Chair BOM",
        product: finishedProducts[1]._id,
        components: [
          { product: components[4]._id, quantity: 1 },
          { product: components[5]._id, quantity: 1 },
          { product: components[6]._id, quantity: 2 },
          { product: components[7]._id, quantity: 5 }
        ]
      },
      {
        name: "Coffee Table BOM",
        product: finishedProducts[2]._id,
        components: [
          { product: components[0]._id, quantity: 2 },
          { product: components[1]._id, quantity: 4 },
          { product: components[9]._id, quantity: 1 },
          { product: components[2]._id, quantity: 12 }
        ]
      },
      {
        name: "Bookshelf BOM",
        product: finishedProducts[3]._id,
        components: [
          { product: components[0]._id, quantity: 6 },
          { product: components[2]._id, quantity: 24 },
          { product: components[3]._id, quantity: 1 }
        ]
      }
    ]);

    console.log('Creating stock entries...');

    const allProducts = [...finishedProducts, ...components];
    const stockEntries = allProducts.map((p) => ({
      product: p._id,
      quantityOnHand: Math.floor(Math.random() * 100) + 10,
      quantityReserved: 0,
      averageCost: Math.floor(Math.random() * 50) + 5,
      location: 'MAIN-WAREHOUSE'
    }));

    await StockLedger.create(stockEntries);

    console.log('Database seeded successfully!');
    console.log(`Created ${finishedProducts.length} finished products`);
    console.log(`Created ${components.length} components/raw materials`);
    console.log(`Created ${boms.length} BOMs`);
    console.log(`Created ${stockEntries.length} stock entries`);

  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

seedData()
  .then(() => {
    console.log("✅ Database seeding finished");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
