import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import BOM from '@/models/BOM';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const productId = searchParams.get('productId');
    const search = searchParams.get('search');
    
    if (id) {
      const bom = await BOM.findById(id)
        .populate('product', 'name sku unitOfMeasure')
        .populate('components.product', 'name sku unitOfMeasure price');
      
      if (!bom) {
        return NextResponse.json(
          { success: false, message: 'BOM not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: bom });
    }
    
    let query = { isActive: true };
    
    if (productId) {
      query.product = productId;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const boms = await BOM.find(query)
      .populate('product', 'name sku')
      .populate('components.product', 'name sku unitOfMeasure price')
      .sort({ name: 1 });
    
    return NextResponse.json({ 
      success: true, 
      data: boms,
      total: boms.length 
    });
  } catch (error) {
    console.error('GET BOMs Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connect();
    
    const bomData = await request.json();
    
    // Validate required fields
    if (!bomData.name || !bomData.product) {
      return NextResponse.json(
        { success: false, message: 'Name and product are required' },
        { status: 400 }
      );
    }
    
    // Verify product exists
    const product = await Product.findById(bomData.product);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 400 }
      );
    }
    
    // Validate components
    if (bomData.components && bomData.components.length > 0) {
      for (const component of bomData.components) {
        if (!component.product || !component.quantity) {
          return NextResponse.json(
            { success: false, message: 'Each component must have a product and quantity' },
            { status: 400 }
          );
        }
        
        const componentProduct = await Product.findById(component.product);
        if (!componentProduct) {
          return NextResponse.json(
            { success: false, message: `Component product ${component.product} not found` },
            { status: 400 }
          );
        }
      }
    }
    
    const newBOM = new BOM(bomData);
    await newBOM.save();
    
    // Calculate total cost
    await newBOM.calculateTotalCost();
    await newBOM.save();
    
    // Populate and return
    const populatedBOM = await BOM.findById(newBOM._id)
      .populate('product', 'name sku unitOfMeasure')
      .populate('components.product', 'name sku unitOfMeasure price');
    
    return NextResponse.json({
      success: true,
      data: populatedBOM,
      message: 'BOM created successfully'
    });
  } catch (error) {
    console.error('POST BOMs Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
