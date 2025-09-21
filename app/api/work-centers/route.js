// // import { NextResponse } from 'next/server';
// // import connect from '@/lib/mongo';
// // import WorkCenter from '@/model/WorkCenter';

// // // --- GET all Work Centers ---
// // export async function GET(request) {
// //   try {
// //     await connect();
// //     const workCenters = await WorkCenter.find({ isActive: true }).sort({ name: 1 });
// //     return NextResponse.json({ success: true, data: workCenters });
// //   } catch (error) {
// //     console.error('GET Work Centers Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- POST a new Work Center ---
// // export async function POST(request) {
// //   try {
// //     await connect();
// //     const body = await request.json();

// //     const newWorkCenter = new WorkCenter(body);
// //     await newWorkCenter.save();

// //     return NextResponse.json({
// //       success: true,
// //       data: newWorkCenter,
// //       message: 'Work Center created successfully'
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error('POST Work Center Error:', error);
// //     if (error.code === 11000) { // Handle duplicate code error
// //       return NextResponse.json(
// //         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
// //         { status: 400 }
// //       );
// //     }
// //     return NextResponse.json(
// //       { success: false, message: error.message || 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- PUT to update a Work Center ---
// // export async function PUT(request) {
// //   try {
// //     await connect();
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');

// //     if (!id) {
// //       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
// //     }

// //     const body = await request.json();
    
// //     const updatedWorkCenter = await WorkCenter.findByIdAndUpdate(id, body, {
// //       new: true,
// //       runValidators: true
// //     });

// //     if (!updatedWorkCenter) {
// //       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: updatedWorkCenter,
// //       message: 'Work Center updated successfully'
// //     });

// //   } catch (error) {
// //     console.error('PUT Work Center Error:', error);
// //      if (error.code === 11000) {
// //       return NextResponse.json(
// //         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
// //         { status: 400 }
// //       );
// //     }
// //     return NextResponse.json(
// //       { success: false, message: error.message || 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- DELETE a Work Center (Soft Delete) ---
// // export async function DELETE(request) {
// //   try {
// //     await connect();
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');

// //     if (!id) {
// //       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
// //     }
    
// //     // We'll perform a soft delete by setting isActive to false
// //     const deletedWorkCenter = await WorkCenter.findByIdAndUpdate(id, { isActive: false }, { new: true });

// //     if (!deletedWorkCenter) {
// //       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: 'Work Center deleted successfully'
// //     });

// //   } catch (error) {
// //     console.error('DELETE Work Center Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }
// // import { NextResponse } from 'next/server';
// // import connect from '@/lib/mongo';
// // import WorkCenter from '@/model/WorkCenter';

// // // --- GET all Work Centers ---
// // export async function GET(request) {
// //   try {
// //     await connect();
// //     const workCenters = await WorkCenter.find({ isActive: true }).sort({ name: 1 });
// //     return NextResponse.json({ success: true, data: workCenters });
// //   } catch (error) {
// //     console.error('GET Work Centers Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- POST a new Work Center ---
// // export async function POST(request) {
// //   try {
// //     await connect();
// //     const body = await request.json();

// //     const newWorkCenter = new WorkCenter(body);
// //     await newWorkCenter.save();

// //     return NextResponse.json({
// //       success: true,
// //       data: newWorkCenter,
// //       message: 'Work Center created successfully'
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error('POST Work Center Error:', error);
// //     if (error.code === 11000) { // Handle duplicate code error
// //       return NextResponse.json(
// //         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
// //         { status: 400 }
// //       );
// //     }
// //     return NextResponse.json(
// //       { success: false, message: error.message || 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- PUT to update a Work Center ---
// // export async function PUT(request) {
// //   try {
// //     await connect();
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');

// //     if (!id) {
// //       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
// //     }

// //     const body = await request.json();
    
// //     // Ensure code is not an empty string if passed
// //     if (body.code === '') {
// //         delete body.code;
// //     }

// //     const updatedWorkCenter = await WorkCenter.findByIdAndUpdate(id, body, {
// //       new: true,
// //       runValidators: true
// //     });

// //     if (!updatedWorkCenter) {
// //       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: updatedWorkCenter,
// //       message: 'Work Center updated successfully'
// //     });

// //   } catch (error) {
// //     console.error('PUT Work Center Error:', error);
// //      if (error.code === 11000) {
// //       return NextResponse.json(
// //         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
// //         { status: 400 }
// //       );
// //     }
// //     return NextResponse.json(
// //       { success: false, message: error.message || 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // --- DELETE a Work Center (Soft Delete) ---
// // export async function DELETE(request) {
// //   try {
// //     await connect();
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');

// //     if (!id) {
// //       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
// //     }
    
// //     // We'll perform a soft delete by setting isActive to false
// //     const deletedWorkCenter = await WorkCenter.findByIdAndUpdate(id, { isActive: false }, { new: true });

// //     if (!deletedWorkCenter) {
// //       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: 'Work Center deleted successfully'
// //     });

// //   } catch (error) {
// //     console.error('DELETE Work Center Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import connect from '@/lib/mongo';
// import WorkCenter from '@/model/WorkCenter';

// // --- GET all Work Centers ---
// export async function GET() {
//   try {
//     await connect();
//     const workCenters = await WorkCenter.find({ isActive: true }).sort({ name: 1 });

//     // --- DEBUGGING LOG ---
//     // This will show the exact data being sent to the frontend in your terminal.
//     console.log('[API GET LOG] Sending Work Centers:', JSON.stringify(workCenters, null, 2));

//     return NextResponse.json({ success: true, data: workCenters });
//   } catch (error) {
//     console.error('GET Work Centers Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- POST a new Work Center ---
// export async function POST(request) {
//   try {
//     await connect();
//     const body = await request.json();

//     // --- DEBUGGING LOG ---
//     console.log('[API POST LOG] Received request body:', body);

//     const newWorkCenter = new WorkCenter(body);
//     await newWorkCenter.save();

//     return NextResponse.json({
//       success: true,
//       data: newWorkCenter,
//       message: 'Work Center created successfully'
//     }, { status: 201 });

//   } catch (error) {
//     console.error('POST Work Center Error:', error);
//     if (error.code === 11000) { // Handle duplicate code error
//       return NextResponse.json(
//         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- PUT to update a Work Center ---
// export async function PUT(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
//     }

//     const body = await request.json();
    
//     // Ensure code is not an empty string if passed
//     if (body.code === '') {
//         delete body.code;
//     }

//     const updatedWorkCenter = await WorkCenter.findByIdAndUpdate(id, body, {
//       new: true,
//       runValidators: true
//     });

//     if (!updatedWorkCenter) {
//       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: updatedWorkCenter,
//       message: 'Work Center updated successfully'
//     });

//   } catch (error) {
//     console.error('PUT Work Center Error:', error);
//      if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, message: `Work Center with code '${error.keyValue.code}' already exists.` },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // --- DELETE a Work Center (Soft Delete) ---
// export async function DELETE(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
//     }
    
//     const deletedWorkCenter = await WorkCenter.findByIdAndUpdate(id, { isActive: false }, { new: true });

//     if (!deletedWorkCenter) {
//       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Work Center deleted successfully'
//     });

//   } catch (error) {
//     console.error('DELETE Work Center Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import connect from '@/lib/mongo';
// import WorkCenter from '@/model/WorkCenter';

// // --- GET Work Centers (with search) ---
// export async function GET(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const searchTerm = searchParams.get('search');

//     let query = { isActive: true };
//     if (searchTerm) {
//         query = {
//             ...query,
//             $or: [
//                 { name: { $regex: searchTerm, $options: 'i' } },
//                 { code: { $regex: searchTerm, $options: 'i' } }
//             ]
//         };
//     }

//     const workCenters = await WorkCenter.find(query).sort({ name: 1 });
//     return NextResponse.json({ success: true, data: workCenters });
//   } catch (error) {
//     console.error('GET Work Centers Error:', error);
//     return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//   }
// }

// // --- POST a new Work Center ---
// export async function POST(request) {
//   try {
//     await connect();
//     const body = await request.json();
//     const newWorkCenter = new WorkCenter(body);
//     await newWorkCenter.save();
//     return NextResponse.json({ success: true, data: newWorkCenter, message: 'Work Center created' }, { status: 201 });
//   } catch (error) {
//     console.error('POST Work Center Error:', error);
//     if (error.code === 11000) {
//       return NextResponse.json({ success: false, message: `Code '${error.keyValue.code}' already exists.` }, { status: 400 });
//     }
//     return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
//   }
// }

// // --- PUT to update a Work Center ---
// export async function PUT(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     if (!id) {
//       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
//     }

//     const body = await request.json();
//     const updatedWorkCenter = await WorkCenter.findByIdAndUpdate(id, body, { new: true, runValidators: true });

//     if (!updatedWorkCenter) {
//       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, data: updatedWorkCenter, message: 'Work Center updated' });
//   } catch (error) {
//     console.error('PUT Work Center Error:', error);
//     if (error.code === 11000) {
//         return NextResponse.json({ success: false, message: `Code '${error.keyValue.code}' already exists.` }, { status: 400 });
//     }
//     return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
//   }
// }

// // --- DELETE a Work Center (Soft Delete) ---
// export async function DELETE(request) {
//   try {
//     await connect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     if (!id) {
//       return NextResponse.json({ success: false, message: 'Work Center ID is required' }, { status: 400 });
//     }
    
//     const deletedWorkCenter = await WorkCenter.findByIdAndUpdate(id, { isActive: false }, { new: true });
//     if (!deletedWorkCenter) {
//       return NextResponse.json({ success: false, message: 'Work Center not found' }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, message: 'Work Center deleted' });
//   } catch (error) {
//     console.error('DELETE Work Center Error:', error);
//     return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import connect from '@/lib/mongo';
import WorkCenter from '@/model/WorkCenter';
import WorkOrder from '@/model/WorkOrder';

// --- GET Work Centers (with search and pagination) ---
export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const skip = (page - 1) * limit;

    let query = includeInactive ? {} : { isActive: true };

    if (searchTerm) {
      query = {
        ...query,
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { code: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      };
    }

    const workCenters = await WorkCenter.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await WorkCenter.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: workCenters,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    console.error('GET Work Centers Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- POST a new Work Center ---
export async function POST(request) {
  try {
    await connect();
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.code) {
      return NextResponse.json(
        { success: false, message: 'Name and Code are required fields.' },
        { status: 400 }
      );
    }

    // Check for duplicate code
    const existingWorkCenter = await WorkCenter.findOne({ 
      code: body.code, 
      isActive: true 
    });

    if (existingWorkCenter) {
      return NextResponse.json(
        { success: false, message: `Work Center with code '${body.code}' already exists.` },
        { status: 400 }
      );
    }

    // Set default values
    const workCenterData = {
      ...body,
      isActive: body.isActive !== undefined ? body.isActive : true,
      capacity: body.capacity || 1,
      costPerHour: body.costPerHour || 0
    };

    const newWorkCenter = new WorkCenter(workCenterData);
    await newWorkCenter.save();

    return NextResponse.json({
      success: true,
      data: newWorkCenter,
      message: 'Work Center created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('POST Work Center Error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return NextResponse.json(
        { success: false, message: `${field} '${value}' already exists.` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- PUT to update a Work Center ---
export async function PUT(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Work Center ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;

    // If code is being updated, check for duplicates
    if (body.code) {
      const existingWorkCenter = await WorkCenter.findOne({
        code: body.code,
        _id: { $ne: id },
        isActive: true
      });

      if (existingWorkCenter) {
        return NextResponse.json(
          { success: false, message: `Work Center with code '${body.code}' already exists.` },
          { status: 400 }
        );
      }
    }

    const updatedWorkCenter = await WorkCenter.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedWorkCenter) {
      return NextResponse.json(
        { success: false, message: 'Work Center not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedWorkCenter,
      message: 'Work Center updated successfully'
    });
  } catch (error) {
    console.error('PUT Work Center Error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return NextResponse.json(
        { success: false, message: `${field} '${value}' already exists.` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// --- DELETE a Work Center (Soft Delete with validation) ---
export async function DELETE(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Work Center ID is required' },
        { status: 400 }
      );
    }

    // Check if work center exists
    const workCenter = await WorkCenter.findById(id);
    if (!workCenter) {
      return NextResponse.json(
        { success: false, message: 'Work Center not found' },
        { status: 404 }
      );
    }

    // Check if work center is being used by any work orders
    const workOrdersCount = await WorkOrder.countDocuments({
      workCenter: id,
      status: { $nin: ['completed', 'cancelled'] }
    });

    if (workOrdersCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot delete Work Center. It is being used by ${workOrdersCount} active work order(s).` 
        },
        { status: 400 }
      );
    }

    // Soft delete
    const deletedWorkCenter = await WorkCenter.findByIdAndUpdate(
      id,
      { 
        isActive: false,
        updatedAt: new Date()
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: deletedWorkCenter,
      message: 'Work Center deactivated successfully'
    });
  } catch (error) {
    console.error('DELETE Work Center Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}