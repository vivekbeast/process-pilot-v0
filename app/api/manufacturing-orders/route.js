// /api/manufacturing-orders/route.js
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import ManufacturingOrder from '@/model/ManufacturingOrder';
import Product from '@/model/Product';
import BOM from '@/model/BOM';

export async function GET(request) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    if (id) {
      // Get single manufacturing order
      const mo = await ManufacturingOrder.findById(id)
        .populate('product', 'name unitOfMeasure')
        .populate({
          path: 'bom',
          populate: {
            path: 'components.product',
            select: 'name unitOfMeasure'
          }
        });
      
      if (!mo) {
        return NextResponse.json(
          { success: false, message: 'Manufacturing Order not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: mo
      });
    } else {
      // Get all manufacturing orders with pagination
      const skip = (page - 1) * limit;
      
      const mos = await ManufacturingOrder.find({})
        .populate('product', 'name unitOfMeasure')
        .populate('bom', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await ManufacturingOrder.countDocuments();
      
      return NextResponse.json({
        success: true,
        data: mos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalOrders: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      });
    }
  } catch (error) {
    console.error('GET Manufacturing Orders Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    await connect();
    
    const body = await request.json();
    const { action, ...orderData } = body;
    
    // --- FIX: CORRECTED LOGIC FOR "CREATE & CONFIRM" ---
    // If the action is to confirm a NEW order (no ID), create it directly with 'confirmed' status.
    if (action === 'confirm' && !orderData._id) {
      // Pass only the order data, not the whole body.
      return await createManufacturingOrder(orderData, 'confirmed'); 
    }
    
    // Handle other state transitions for EXISTING orders
    switch (action) {
      case 'create':
        // Creates a 'draft' order by default
        return await createManufacturingOrder(orderData);
      case 'confirm':
        return await confirmManufacturingOrder(orderData);
      case 'start':
        return await startProduction(orderData);
      case 'complete':
        return await completeProduction(orderData);
      case 'cancel':
        return await cancelProduction(orderData);
      default:
        // If no action is specified, default to creating a draft.
        return await createManufacturingOrder(body);
    }
  } catch (error) {
    console.error('POST Manufacturing Orders Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    // const id = searchParams.get('id');
    const reference = searchParams.get('id');
    
    if (!reference) {
      return NextResponse.json(
        { success: false, message: 'Manufacturing Order ID is required' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.moNumber;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    

     // string reference

const updatedMO = await ManufacturingOrder.findOneAndUpdate(
  { moNumber: reference },
  updateData,
  { new: true, runValidators: true }
)
.populate('product', 'name unitOfMeasure')
.populate({
  path: 'bom',
  populate: { path: 'components.product', select: 'name unitOfMeasure' }
});


    // const updatedMO = await ManufacturingOrder.findByIdAndUpdate(
    //   id,
    //   updateData,
    //   { new: true, runValidators: true }
    // )
    // .populate('product', 'name unitOfMeasure')
    // .populate({
    //   path: 'bom',
    //   populate: {
    //     path: 'components.product',
    //     select: 'name unitOfMeasure'
    //   }
    // });
    
    if (!updatedMO) {
      return NextResponse.json(
        { success: false, message: 'Manufacturing Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedMO,
      message: 'Manufacturing Order updated successfully'
    });
  } catch (error) {
    console.error('PUT Manufacturing Orders Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Manufacturing Order ID is required' },
        { status: 400 }
      );
    }
    
    const mo = await ManufacturingOrder.findById(id);
    
    if (!mo) {
      return NextResponse.json(
        { success: false, message: 'Manufacturing Order not found' },
        { status: 404 }
      );
    }
    
    // Only allow deletion of draft orders
    if (mo.status !== 'draft') {
      return NextResponse.json(
        { success: false, message: 'Only draft orders can be deleted' },
        { status: 400 }
      );
    }
    
    await ManufacturingOrder.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Manufacturing Order deleted successfully'
    });
  } catch (error) {
    console.error('DELETE Manufacturing Orders Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper Functions


async function createManufacturingOrder(orderData, initialStatus = 'draft') {
  // --- FIX 1: USE CORRECT FIELD NAMES FROM THE START ---
  const { 
    productToManufacture: productData, // Rename for clarity
    quantityToProduce: quantity,       // Rename to match schema
    bom: bomData,                      // Rename for clarity
    startDate 
  } = orderData;
  
  // Validation
  if (!productData?._id) {
    return NextResponse.json({ success: false, message: 'Product is required' }, { status: 400 });
  }
  if (!quantity || quantity <= 0) {
    return NextResponse.json({ success: false, message: 'Valid quantity is required' }, { status: 400 });
  }
  if (!bomData?._id) {
    return NextResponse.json({ success: false, message: 'BOM is required' }, { status: 400 });
  }
  
  // --- FIX 2: USE findById FOR RELIABLE DOCUMENT LOOKUP ---
  const product = await Product.findById(productData._id);
  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }

  const bomDoc = await BOM.findById(bomData._id);
  if (!bomDoc) {
    return NextResponse.json({ success: false, message: 'BOM not found' }, { status: 404 });
  }
  
  // --- FIX 3: INTEGRATE REAL INVENTORY CHECK (placeholder for now) ---
  // This is where you would check StockLedger for component availability.
  // For now, we'll keep the placeholder logic.
  let componentStatus = 'Not Available';
  if (bomDoc && bomDoc.components.length > 0) {
    // TODO: Replace this with actual inventory checking against StockLedger.
    // Example: Check if (stock.quantityOnHand - stock.quantityReserved) >= requiredQty
    componentStatus = 'Available'; 
  }
  
  // Generate MO number
  const moNumber = await ManufacturingOrder.generateMONumber();
  
  // --- FIX 4: SAVE DATA USING CORRECT SCHEMA FIELD NAMES ---
  const newMO = new ManufacturingOrder({
    moNumber,
    product: product._id, // Use the ID
    bom: bomDoc._id,      // Use the ID
    quantity: quantity,   // Correct field name
    status: initialStatus,
    componentStatus,
    scheduleStart: startDate ? new Date(startDate) : new Date(),
  });
  
  await newMO.save();
  
  // Populate and return
  const populatedMO = await ManufacturingOrder.findById(newMO._id)
    .populate('product', 'name unitOfMeasure')
    .populate({
      path: 'bom',
      populate: { path: 'components.product', select: 'name unitOfMeasure' }
    });
  
  return NextResponse.json({
    success: true,
    data: populatedMO,
    message: `Manufacturing Order created successfully with status: ${initialStatus}`
  }, { status: 201 });
}

async function confirmManufacturingOrder(orderData) {
  const { _id, reference } = orderData;
  
  let mo;
  if (_id) {
    mo = await ManufacturingOrder.findById(_id);
  } else if (reference) {
    mo = await ManufacturingOrder.findOne({ moNumber: reference });
  }
  
  if (!mo) {
    return NextResponse.json(
      { success: false, message: 'Manufacturing Order not found' },
      { status: 404 }
    );
  }
  
  if (mo.status !== 'draft') {
    return NextResponse.json(
      { success: false, message: 'Only draft orders can be confirmed' },
      { status: 400 }
    );
  }
  
  // Update status
  mo.status = 'confirmed';
  await mo.save();
  
  // Populate and return
  const populatedMO = await ManufacturingOrder.findById(mo._id)
    .populate('product', 'name unitOfMeasure')
    .populate({
      path: 'bom',
      populate: {
        path: 'components.product',
        select: 'name unitOfMeasure'
      }
    });
  
  return NextResponse.json({
    success: true,
    data: populatedMO,
    message: 'Manufacturing Order confirmed successfully'
  });
}

async function startProduction(orderData) {
  const { _id, reference } = orderData;
  
  let mo;
  if (_id) {
    mo = await ManufacturingOrder.findById(_id);
  } else if (reference) {
    mo = await ManufacturingOrder.findOne({ moNumber: reference });
  }
  
  if (!mo) {
    return NextResponse.json(
      { success: false, message: 'Manufacturing Order not found' },
      { status: 404 }
    );
  }
  
  if (mo.status !== 'confirmed') {
    return NextResponse.json(
      { success: false, message: 'Only confirmed orders can be started' },
      { status: 400 }
    );
  }
  
  // Update status
  mo.status = 'in_progress';
  mo.scheduleStart = new Date();
  await mo.save();
  
  // Populate and return
  const populatedMO = await ManufacturingOrder.findById(mo._id)
    .populate('product', 'name unitOfMeasure')
    .populate({
      path: 'bom',
      populate: {
        path: 'components.product',
        select: 'name unitOfMeasure'
      }
    });
  
  return NextResponse.json({
    success: true,
    data: populatedMO,
    message: 'Production started successfully'
  });
}

async function completeProduction(orderData) {
  const { _id, reference, producedQty } = orderData;
  
  let mo;
  if (_id) {
    mo = await ManufacturingOrder.findById(_id);
  } else if (reference) {
    mo = await ManufacturingOrder.findOne({ moNumber: reference });
  }
  
  if (!mo) {
    return NextResponse.json(
      { success: false, message: 'Manufacturing Order not found' },
      { status: 404 }
    );
  }
  
  if (mo.status !== 'in_progress' && mo.status !== 'to_close') {
    return NextResponse.json(
      { success: false, message: 'Only in-progress orders can be completed' },
      { status: 400 }
    );
  }
  
  // Update status and produced quantity
  mo.status = 'done';
  mo.producedQty = producedQty || mo.quantity;
  mo.scheduleEnd = new Date();
  await mo.save();
  
  // Populate and return
  const populatedMO = await ManufacturingOrder.findById(mo._id)
    .populate('product', 'name unitOfMeasure')
    .populate({
      path: 'bom',
      populate: {
        path: 'components.product',
        select: 'name unitOfMeasure'
      }
    });
  
  return NextResponse.json({
    success: true,
    data: populatedMO,
    message: 'Production completed successfully'
  });
}

async function cancelProduction(orderData) {
  const { _id, reference } = orderData;
  
  let mo;
  if (_id) {
    mo = await ManufacturingOrder.findById(_id);
  } else if (reference) {
    mo = await ManufacturingOrder.findOne({ moNumber: reference });
  }
  
  if (!mo) {
    return NextResponse.json(
      { success: false, message: 'Manufacturing Order not found' },
      { status: 404 }
    );
  }
  
  if (mo.status === 'done') {
    return NextResponse.json(
      { success: false, message: 'Completed orders cannot be cancelled' },
      { status: 400 }
    );
  }
  
  // Update status
  mo.status = 'cancelled';
  await mo.save();
  
  // Populate and return
  const populatedMO = await ManufacturingOrder.findById(mo._id)
    .populate('product', 'name unitOfMeasure')
    .populate({
      path: 'bom',
      populate: {
        path: 'components.product',
        select: 'name unitOfMeasure'
      }
    });
  
  return NextResponse.json({
    success: true,
    data: populatedMO,
    message: 'Manufacturing Order cancelled successfully'
  });
}