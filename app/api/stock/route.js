// // /api/stock/route.js
// import { NextResponse } from 'next/server';
// import connect from '@/lib/mongo';
// import StockLedger from '@/model/StockLedgerEntry';
// import Product from '@/model/Product';

// export async function GET(request) {
//   try {
//     await connect();
    
//     const { searchParams } = new URL(request.url);
//     const productId = searchParams.get('productId');
//     const location = searchParams.get('location');
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = parseInt(searchParams.get('limit')) || 50;
    
//     let query = {};
//     if (productId) {
//       query.product = productId;
//     }
//     if (location) {
//       query.location = location;
//     }
    
//     const skip = (page - 1) * limit;
    
//     const stocks = await StockLedger.find(query)
//       .populate('product', 'name unitOfMeasure productType')
//       .sort({ 'product.name': 1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await StockLedger.countDocuments(query);
    
//     return NextResponse.json({
//       success: true,
//       data: stocks,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         totalStock: total
//       }
//     });
//   } catch (error) {
//     console.error('GET Stock Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connect();
    
//     const stockData = await request.json();
    
//     // Validate product exists
//     const product = await Product.findById(stockData.product);
//     if (!product) {
//       return NextResponse.json(
//         { success: false, message: 'Product not found' },
//         { status: 404 }
//       );
//     }
    
//     // Check if stock already exists for this product and location
//     const existingStock = await StockLedger.findOne({
//       product: stockData.product,
//       location: stockData.location || 'MAIN-WAREHOUSE'
//     });
    
//     if (existingStock) {
//       return NextResponse.json(
//         { success: false, message: 'Stock entry already exists for this product and location' },
//         { status: 400 }
//       );
//     }
    
//     const newStock = new StockLedger(stockData);
//     await newStock.save();
    
//     const populatedStock = await StockLedger.findById(newStock._id)
//       .populate('product', 'name unitOfMeasure productType');
    
//     return NextResponse.json({
//       success: true,
//       data: populatedStock,
//       message: 'Stock entry created successfully'
//     }, { status: 201 });
    
//   } catch (error) {
//     console.error('POST Stock Error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // Update stock quantities
// export async function PUT(request) {
//   try {
//     await connect();
    
//     const { searchParams } = new URL(request.url);
//     const stockId = searchParams.get('id');
    
//     if (!stockId) {
//       return NextResponse.json(
//         { success: false, message: 'Stock ID is required' },
//         { status: 400 }
//       );
//     }
    
//     const updateData = await request.json();
    
//     const updatedStock = await StockLedger.findByIdAndUpdate(
//       stockId,
//       { 
//         ...updateData,
//         lastMovementDate: new Date()
//       },
//       { new: true, runValidators: true }
//     ).populate('product', 'name unitOfMeasure productType');
    
//     if (!updatedStock) {
//       return NextResponse.json(
//         { success: false, message: 'Stock entry not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: updatedStock,
//       message: 'Stock updated successfully'
//     });
    
//   } catch (error) {
//     console.error('PUT Stock Error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import StockLedger from '@/model/StockLedgerEntry';
import Product from '@/model/Product';

// --- GET Stock Ledger Entries (with server-side search) ---
export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    if (searchTerm) {
      // Find products whose names match the search term
      const matchingProducts = await Product.find({
        name: { $regex: searchTerm, $options: 'i' }
      }).select('_id');

      // Get an array of just the IDs
      const productIds = matchingProducts.map(p => p._id);
      
      // Update the main query to find stock entries for those products
      query.product = { $in: productIds };
    }
    
    const stocks = await StockLedger.find(query)
      .populate('product', 'name unitOfMeasure productType')
      .sort({ 'product.name': 1 })
      .skip(skip)
      .limit(limit);
      
    const total = await StockLedger.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: stocks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('GET Stock Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// --- POST a new Stock Entry ---
export async function POST(request) {
  try {
    await connect();
    const stockData = await request.json();

    const existingStock = await StockLedger.findOne({ product: stockData.product });
    if (existingStock) {
      return NextResponse.json({ success: false, message: 'Stock entry for this product already exists.' }, { status: 400 });
    }
    
    const newStock = new StockLedger(stockData);
    await newStock.save();
    
    const populatedStock = await StockLedger.findById(newStock._id)
      .populate('product', 'name unitOfMeasure productType');
      
    return NextResponse.json({ success: true, data: populatedStock, message: 'Stock entry created.' }, { status: 201 });
  } catch (error) {
    console.error('POST Stock Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}

// --- PUT to update a Stock Entry ---
export async function PUT(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const stockId = searchParams.get('id');
    if (!stockId) {
      return NextResponse.json({ success: false, message: 'Stock ID is required' }, { status: 400 });
    }
    
    const updateData = await request.json();
    
    const updatedStock = await StockLedger.findByIdAndUpdate(
      stockId,
      { 
        ...updateData,
        lastMovementDate: new Date()
      },
      { new: true, runValidators: true }
    ).populate('product', 'name unitOfMeasure productType');
    
    if (!updatedStock) {
      return NextResponse.json({ success: false, message: 'Stock entry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedStock, message: 'Stock updated.' });
  } catch (error) {
    console.error('PUT Stock Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
