// // // import { NextResponse } from 'next/server';
// // // import connect from '@/lib/mongo';
// // // import WorkOrder from '@/model/WorkOrder';
// // // import mongoose from 'mongoose';

// // // // --- GET all Work Orders for a specific Manufacturing Order ---
// // // export async function GET(request) {
// // //   try {
// // //     await connect();
// // //     const { searchParams } = new URL(request.url);
// // //     const moNumber = searchParams.get('moNumber');

// // //     if (!moNumber) {
// // //       return NextResponse.json({ success: false, message: 'Manufacturing Order number is required' }, { status: 400 });
// // //     }

// // //     const workOrders = await WorkOrder.find({ moNumber })
// // //       .populate('workCenter', 'name code')
// // //       .sort({ sequence: 1 }); // Sort by sequence to ensure correct order

// // //     return NextResponse.json({ success: true, data: workOrders });
// // //   } catch (error) {
// // //     console.error('GET Work Orders Error:', error);
// // //     return NextResponse.json(
// // //       { success: false, message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }


// // // // --- PUT to update a Work Order's status ---
// // // export async function PUT(request) {
// // //   try {
// // //     await connect();
// // //     const { searchParams } = new URL(request.url);
// // //     const id = searchParams.get('id');
// // //     const { action } = await request.json();

// // //     if (!id || !action) {
// // //       return NextResponse.json({ success: false, message: 'Work Order ID and action are required' }, { status: 400 });
// // //     }

// // //     const workOrder = await WorkOrder.findById(id);
// // //     if (!workOrder) {
// // //       return NextResponse.json({ success: false, message: 'Work Order not found' }, { status: 404 });
// // //     }
    
// // //     // State machine logic for work order status
// // //     switch (action) {
// // //       case 'start':
// // //         if (workOrder.status === 'ready' || workOrder.status === 'paused') {
// // //           workOrder.status = 'in_progress';
// // //           workOrder.startTime = workOrder.startTime || new Date();
// // //         } else {
// // //           return NextResponse.json({ success: false, message: `Cannot start a work order with status: ${workOrder.status}`}, { status: 400 });
// // //         }
// // //         break;
// // //       case 'pause':
// // //         if (workOrder.status === 'in_progress') {
// // //           workOrder.status = 'paused';
// // //           // Calculate elapsed time and add to actualDuration
// // //           const elapsed = (new Date() - new Date(workOrder.startTime)) / (1000 * 60); // in minutes
// // //           workOrder.actualDuration += elapsed;
// // //           workOrder.startTime = null; // Reset start time
// // //         } else {
// // //            return NextResponse.json({ success: false, message: 'Can only pause an in-progress work order'}, { status: 400 });
// // //         }
// // //         break;
// // //       case 'complete':
// // //         if (workOrder.status === 'in_progress' || workOrder.status === 'paused') {
// // //             workOrder.status = 'done';
// // //             workOrder.endTime = new Date();
// // //              if (workOrder.startTime) { // If it was running, calculate final duration
// // //                 const elapsed = (new Date() - new Date(workOrder.startTime)) / (1000 * 60);
// // //                 workOrder.actualDuration += elapsed;
// // //             }
// // //         } else {
// // //             return NextResponse.json({ success: false, message: 'Can only complete an in-progress or paused work order'}, { status: 400 });
// // //         }
// // //         break;
// // //       default:
// // //         return NextResponse.json({ success: false, message: 'Invalid action provided' }, { status: 400 });
// // //     }

// // //     await workOrder.save();

// // //     const populatedWO = await WorkOrder.findById(workOrder._id).populate('workCenter', 'name code');

// // //     return NextResponse.json({
// // //       success: true,
// // //       data: populatedWO,
// // //       message: `Work Order status updated to ${workOrder.status}`
// // //     });

// // //   } catch (error) {
// // //     console.error('PUT Work Order Error:', error);
// // //     return NextResponse.json(
// // //       { success: false, message: error.message || 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import connect from '@/lib/mongo';
// // import WorkOrder from '@/model/WorkOrder';
// // import ManufacturingOrder from '@/model/ManufacturingOrder';
// // import Product from '@/model/Product';
// // import WorkCenter from '@/model/WorkCenter';

// // // This is a new GET endpoint specifically for the main Work Orders page.
// // // It uses an aggregation pipeline to efficiently gather all necessary data.
// // export async function GET() {
// //   try {
// //     await connect();

// //     const workOrders = await WorkOrder.aggregate([
// //       // Stage 1: Lookup the parent Manufacturing Order using moNumber
// //       {
// //         $lookup: {
// //           from: ManufacturingOrder.collection.name,
// //           localField: 'moNumber',
// //           foreignField: 'moNumber',
// //           as: 'manufacturingOrder'
// //         }
// //       },
// //       // Deconstruct the array from the lookup
// //       { $unwind: '$manufacturingOrder' },
      
// //       // Stage 2: Lookup the finished Product from the Manufacturing Order
// //       {
// //         $lookup: {
// //           from: Product.collection.name,
// //           localField: 'manufacturingOrder.product',
// //           foreignField: '_id',
// //           as: 'finishedProduct'
// //         }
// //       },
// //       { $unwind: '$finishedProduct' },

// //       // Stage 3: Lookup the Work Center
// //       {
// //         $lookup: {
// //           from: WorkCenter.collection.name,
// //           localField: 'workCenter',
// //           foreignField: '_id',
// //           as: 'workCenterInfo'
// //         }
// //       },
// //       { $unwind: '$workCenterInfo' },

// //       // Stage 4: Project the final shape of the data
// //       {
// //         $project: {
// //           _id: 1,
// //           operationName: 1,
// //           moNumber: 1,
// //           status: 1,
// //           expectedDuration: 1,
// //           actualDuration: 1,
// //           'workCenter.name': '$workCenterInfo.name',
// //           'finishedProduct.name': '$finishedProduct.name'
// //         }
// //       },
// //       // Stage 5: Sort the results
// //       {
// //           $sort: {
// //               createdAt: -1
// //           }
// //       }
// //     ]);

// //     return NextResponse.json({ success: true, data: workOrders });

// //   } catch (error) {
// //     console.error('GET All Work Orders Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }
// // import { NextResponse } from 'next/server';
// // import connect from '@/lib/mongo';
// // import WorkOrder from '@/model/WorkOrder';
// // import ManufacturingOrder from '@/model/ManufacturingOrder';
// // import Product from '@/model/Product';
// // import WorkCenter from '@/model/WorkCenter';
// // import mongoose from 'mongoose';

// // // --- GET all Work Orders (with search) ---
// // export async function GET(request) {
// //   try {
// //     await connect();
// //     const { searchParams } = new URL(request.url);
// //     const searchTerm = searchParams.get('search');
    
// //     const pipeline = [];

// //     // Stage 1: Optional Search ($match)
// //     if (searchTerm) {
// //       pipeline.push({
// //         $lookup: {
// //           from: WorkCenter.collection.name,
// //           localField: 'workCenter',
// //           foreignField: '_id',
// //           as: 'workCenterInfo'
// //         }
// //       }, {
// //         $lookup: {
// //           from: ManufacturingOrder.collection.name,
// //           localField: 'moNumber',
// //           foreignField: 'moNumber',
// //           as: 'moInfo'
// //         }
// //       }, {
// //         $lookup: {
// //           from: Product.collection.name,
// //           localField: 'moInfo.product',
// //           foreignField: '_id',
// //           as: 'productInfo'
// //         }
// //       }, {
// //         $match: {
// //           $or: [
// //             { operationName: { $regex: searchTerm, $options: 'i' } },
// //             { moNumber: { $regex: searchTerm, $options: 'i' } },
// //             { status: { $regex: searchTerm, $options: 'i' } },
// //             { 'workCenterInfo.name': { $regex: searchTerm, $options: 'i' } },
// //             { 'productInfo.name': { $regex: searchTerm, $options: 'i' } }
// //           ]
// //         }
// //       });
// //     }

// //     // Subsequent stages for data joining and shaping
// //     pipeline.push(
// //       { $lookup: { from: ManufacturingOrder.collection.name, localField: 'moNumber', foreignField: 'moNumber', as: 'manufacturingOrder' } },
// //       { $unwind: '$manufacturingOrder' },
// //       { $lookup: { from: Product.collection.name, localField: 'manufacturingOrder.product', foreignField: '_id', as: 'finishedProduct' } },
// //       { $unwind: '$finishedProduct' },
// //       { $lookup: { from: WorkCenter.collection.name, localField: 'workCenter', foreignField: '_id', as: 'workCenterInfo' } },
// //       { $unwind: '$workCenterInfo' },
// //       {
// //         $project: {
// //           _id: 1,
// //           operationName: 1,
// //           moNumber: 1,
// //           status: 1,
// //           expectedDuration: 1,
// //           actualDuration: 1,
// //           createdAt: 1,
// //           workCenter: { _id: '$workCenterInfo._id', name: '$workCenterInfo.name' },
// //           finishedProduct: { _id: '$finishedProduct._id', name: '$finishedProduct.name' }
// //         }
// //       },
// //       { $sort: { createdAt: -1 } }
// //     );

// //     const workOrders = await WorkOrder.aggregate(pipeline);

// //     return NextResponse.json({ success: true, data: workOrders });

// //   } catch (error) {
// //     console.error('GET All Work Orders Error:', error);
// //     return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
// //   }
// // }

// // // --- POST a new Work Order ---
// // export async function POST(request) {
// //     try {
// //         await connect();
// //         const body = await request.json();

// //         // Basic validation
// //         if (!body.moNumber || !body.operationName || !body.workCenter) {
// //             return NextResponse.json({ success: false, message: 'Missing required fields for Work Order.' }, { status: 400 });
// //         }

// //         const newWorkOrder = new WorkOrder(body);
// //         await newWorkOrder.save();

// //         return NextResponse.json({
// //             success: true,
// //             data: newWorkOrder,
// //             message: 'Work Order created successfully'
// //         }, { status: 201 });

// //     } catch (error) {
// //         console.error('POST Work Order Error:', error);
// //         return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
// //     }
// // }

// import { NextResponse } from 'next/server';
// import connect from '@/lib/mongo';
// import WorkOrder from '@/model/WorkOrder';
// import ManufacturingOrder from '@/model/ManufacturingOrder';
// import Product from '@/model/Product';
// import WorkCenter from '@/model/WorkCenter';
// import mongoose from 'mongoose';

// // --- GET all Work Orders (with search) ---
// export async function GET(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const searchTerm = searchParams.get('search');
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = parseInt(searchParams.get('limit')) || 20;
//     const skip = (page - 1) * limit;

//     let query = {};

//     // If there's a search term, build the search query
//     if (searchTerm) {
//       // First, find work centers that match the search term
//       const matchingWorkCenters = await WorkCenter.find({
//         $or: [
//           { name: { $regex: searchTerm, $options: 'i' } },
//           { code: { $regex: searchTerm, $options: 'i' } }
//         ]
//       }).select('_id');

//       const workCenterIds = matchingWorkCenters.map(wc => wc._id);

//       query = {
//         $or: [
//           { operationName: { $regex: searchTerm, $options: 'i' } },
//           { moNumber: { $regex: searchTerm, $options: 'i' } },
//           { status: { $regex: searchTerm, $options: 'i' } },
//           { workCenter: { $in: workCenterIds } }
//         ]
//       };
//     }

//     // Get work orders with populated data
//     const workOrders = await WorkOrder.find(query)
//       .populate('workCenter', 'name code')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     // Get additional data for each work order
//     const enrichedWorkOrders = await Promise.all(
//       workOrders.map(async (wo) => {
//         try {
//           // Find the manufacturing order
//           const mo = await ManufacturingOrder.findOne({ moNumber: wo.moNumber })
//             .populate('product', 'name unitOfMeasure');

//           return {
//             _id: wo._id,
//             operationName: wo.operationName,
//             moNumber: wo.moNumber,
//             status: wo.status,
//             expectedDuration: wo.expectedDuration,
//             actualDuration: wo.actualDuration,
//             createdAt: wo.createdAt,
//             workCenter: wo.workCenter,
//             finishedProduct: mo?.product || null,
//             manufacturingOrder: mo ? {
//               _id: mo._id,
//               status: mo.status,
//               quantity: mo.quantity
//             } : null
//           };
//         } catch (error) {
//           console.error(`Error enriching work order ${wo._id}:`, error);
//           return {
//             _id: wo._id,
//             operationName: wo.operationName,
//             moNumber: wo.moNumber,
//             status: wo.status,
//             expectedDuration: wo.expectedDuration,
//             actualDuration: wo.actualDuration,
//             createdAt: wo.createdAt,
//             workCenter: wo.workCenter,
//             finishedProduct: null,
//             manufacturingOrder: null
//           };
//         }
//       })
//     );

//     const total = await WorkOrder.countDocuments(query);

//     return NextResponse.json({
//       success: true,
//       data: enrichedWorkOrders,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         totalOrders: total
//       }
//     });
//   } catch (error) {
//     console.error('GET All Work Orders Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- POST a new Work Order ---
// export async function POST(request) {
//   try {
//     await connect();
//     const body = await request.json();

//     // Basic validation
//     if (!body.moNumber || !body.operationName || !body.workCenter) {
//       return NextResponse.json(
//         { success: false, message: 'Missing required fields: moNumber, operationName, and workCenter are required.' },
//         { status: 400 }
//       );
//     }

//     // Validate that the referenced manufacturing order exists
//     const manufacturingOrder = await ManufacturingOrder.findOne({ moNumber: body.moNumber });
//     if (!manufacturingOrder) {
//       return NextResponse.json(
//         { success: false, message: 'Manufacturing Order not found with the provided moNumber.' },
//         { status: 400 }
//       );
//     }

//     // Validate that the work center exists
//     const workCenter = await WorkCenter.findById(body.workCenter);
//     if (!workCenter) {
//       return NextResponse.json(
//         { success: false, message: 'Work Center not found.' },
//         { status: 400 }
//       );
//     }

//     // Check if work order already exists for this MO and operation
//     const existingWorkOrder = await WorkOrder.findOne({
//       moNumber: body.moNumber,
//       operationName: body.operationName
//     });

//     if (existingWorkOrder) {
//       return NextResponse.json(
//         { success: false, message: 'Work Order already exists for this Manufacturing Order and operation.' },
//         { status: 400 }
//       );
//     }

//     const newWorkOrder = new WorkOrder(body);
//     await newWorkOrder.save();

//     // Populate the response
//     const populatedWorkOrder = await WorkOrder.findById(newWorkOrder._id)
//       .populate('workCenter', 'name code');

//     return NextResponse.json({
//       success: true,
//       data: populatedWorkOrder,
//       message: 'Work Order created successfully'
//     }, { status: 201 });
//   } catch (error) {
//     console.error('POST Work Order Error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- PUT to update a Work Order ---
// export async function PUT(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: 'Work Order ID is required' },
//         { status: 400 }
//       );
//     }

//     const updateData = await request.json();

//     // Remove fields that shouldn't be updated directly
//     delete updateData._id;
//     delete updateData.createdAt;

//     // If workCenter is being updated, validate it exists
//     if (updateData.workCenter) {
//       const workCenter = await WorkCenter.findById(updateData.workCenter);
//       if (!workCenter) {
//         return NextResponse.json(
//           { success: false, message: 'Work Center not found.' },
//           { status: 400 }
//         );
//       }
//     }

//     const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('workCenter', 'name code');

//     if (!updatedWorkOrder) {
//       return NextResponse.json(
//         { success: false, message: 'Work Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: updatedWorkOrder,
//       message: 'Work Order updated successfully'
//     });
//   } catch (error) {
//     console.error('PUT Work Order Error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- DELETE a Work Order ---
// export async function DELETE(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: 'Work Order ID is required' },
//         { status: 400 }
//       );
//     }

//     const workOrder = await WorkOrder.findById(id);
//     if (!workOrder) {
//       return NextResponse.json(
//         { success: false, message: 'Work Order not found' },
//         { status: 404 }
//       );
//     }

//     // Only allow deletion of certain statuses
//     if (workOrder.status === 'completed') {
//       return NextResponse.json(
//         { success: false, message: 'Completed work orders cannot be deleted' },
//         { status: 400 }
//       );
//     }

//     await WorkOrder.findByIdAndDelete(id);

//     return NextResponse.json({
//       success: true,
//       message: 'Work Order deleted successfully'
//     });
//   } catch (error) {
//     console.error('DELETE Work Order Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import WorkOrder from '@/model/WorkOrder';
import ManufacturingOrder from '@/model/ManufacturingOrder';
import Product from '@/model/Product';
import WorkCenter from '@/model/WorkCenter';
import mongoose from 'mongoose';

// --- GET all Work Orders (with search) ---
export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    // If there's a search term, build the search query
    if (searchTerm) {
      // First, find work centers that match the search term
      const matchingWorkCenters = await WorkCenter.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { code: { $regex: searchTerm, $options: 'i' } }
        ]
      }).select('_id');

      const workCenterIds = matchingWorkCenters.map(wc => wc._id);

      query = {
        $or: [
          { operationName: { $regex: searchTerm, $options: 'i' } },
          { moNumber: { $regex: searchTerm, $options: 'i' } },
          { status: { $regex: searchTerm, $options: 'i' } },
          { workCenter: { $in: workCenterIds } }
        ]
      };
    }

    // Get work orders with populated data
    const workOrders = await WorkOrder.find(query)
      .populate('workCenter', 'name code')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get additional data for each work order
    const enrichedWorkOrders = await Promise.all(
      workOrders.map(async (wo) => {
        try {
          // Find the manufacturing order
          const mo = await ManufacturingOrder.findOne({ moNumber: wo.moNumber })
            .populate('product', 'name unitOfMeasure');

          return {
            _id: wo._id,
            operationName: wo.operationName,
            moNumber: wo.moNumber,
            status: wo.status,
            expectedDuration: wo.expectedDuration,
            actualDuration: wo.actualDuration,
            createdAt: wo.createdAt,
            workCenter: wo.workCenter,
            finishedProduct: mo?.product || null,
            manufacturingOrder: mo ? {
              _id: mo._id,
              status: mo.status,
              quantity: mo.quantity
            } : null
          };
        } catch (error) {
          console.error(`Error enriching work order ${wo._id}:`, error);
          return {
            _id: wo._id,
            operationName: wo.operationName,
            moNumber: wo.moNumber,
            status: wo.status,
            expectedDuration: wo.expectedDuration,
            actualDuration: wo.actualDuration,
            createdAt: wo.createdAt,
            workCenter: wo.workCenter,
            finishedProduct: null,
            manufacturingOrder: null
          };
        }
      })
    );

    const total = await WorkOrder.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: enrichedWorkOrders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('GET All Work Orders Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- POST a new Work Order ---
export async function POST(request) {
  try {
    await connect();
    const body = await request.json();

    // Basic validation
    if (!body.moNumber || !body.operationName || !body.workCenter) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: moNumber, operationName, and workCenter are required.' },
        { status: 400 }
      );
    }

    // Validate that the referenced manufacturing order exists
    const manufacturingOrder = await ManufacturingOrder.findOne({ moNumber: body.moNumber });
    if (!manufacturingOrder) {
      return NextResponse.json(
        { success: false, message: 'Manufacturing Order not found with the provided moNumber.' },
        { status: 400 }
      );
    }

    // Validate that the work center exists
    const workCenter = await WorkCenter.findById(body.workCenter);
    if (!workCenter) {
      return NextResponse.json(
        { success: false, message: 'Work Center not found.' },
        { status: 400 }
      );
    }

    // Check if work order already exists for this MO and operation
    const existingWorkOrder = await WorkOrder.findOne({
      moNumber: body.moNumber,
      operationName: body.operationName
    });

    if (existingWorkOrder) {
      return NextResponse.json(
        { success: false, message: 'Work Order already exists for this Manufacturing Order and operation.' },
        { status: 400 }
      );
    }

    const newWorkOrder = new WorkOrder(body);
    await newWorkOrder.save();

    // Populate the response
    const populatedWorkOrder = await WorkOrder.findById(newWorkOrder._id)
      .populate('workCenter', 'name code');

    return NextResponse.json({
      success: true,
      data: populatedWorkOrder,
      message: 'Work Order created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('POST Work Order Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- PUT to update a Work Order ---
export async function PUT(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Work Order ID is required' },
        { status: 400 }
      );
    }

    const updateData = await request.json();

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;

    // If workCenter is being updated, validate it exists
    if (updateData.workCenter) {
      const workCenter = await WorkCenter.findById(updateData.workCenter);
      if (!workCenter) {
        return NextResponse.json(
          { success: false, message: 'Work Center not found.' },
          { status: 400 }
        );
      }
    }

    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('workCenter', 'name code');

    if (!updatedWorkOrder) {
      return NextResponse.json(
        { success: false, message: 'Work Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedWorkOrder,
      message: 'Work Order updated successfully'
    });
  } catch (error) {
    console.error('PUT Work Order Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- DELETE a Work Order ---
export async function DELETE(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Work Order ID is required' },
        { status: 400 }
      );
    }

    const workOrder = await WorkOrder.findById(id);
    if (!workOrder) {
      return NextResponse.json(
        { success: false, message: 'Work Order not found' },
        { status: 404 }
      );
    }

    // Only allow deletion of certain statuses
    if (workOrder.status === 'completed') {
      return NextResponse.json(
        { success: false, message: 'Completed work orders cannot be deleted' },
        { status: 400 }
      );
    }

    await WorkOrder.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Work Order deleted successfully'
    });
  } catch (error) {
    console.error('DELETE Work Order Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}