import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const isFinishedProduct = searchParams.get('finished'); // for filtering finished products
    
    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { success: false, message: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: product });
    }
    
    let query = { isActive: true };
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    // Filter for finished products (products that can be manufactured)
    if (isFinishedProduct === 'true') {
      query.category = { $in: ['Finished Goods', 'Products'] };
    }
    
    const products = await Product.find(query)
      .select('name sku category unitOfMeasure price description isActive')
      .sort({ name: 1 });
    
    return NextResponse.json({ 
      success: true, 
      data: products,
      total: products.length 
    });
  } catch (error) {
    console.error('GET Products Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connect();
    
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.sku || !productData.category || !productData.unitOfMeasure) {
      return NextResponse.json(
        { success: false, message: 'Name, SKU, category, and unit of measure are required' },
        { status: 400 }
      );
    }
    
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product with this SKU already exists' },
        { status: 400 }
      );
    }
    
    const newProduct = new Product(productData);
    await newProduct.save();
    
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('POST Products Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}