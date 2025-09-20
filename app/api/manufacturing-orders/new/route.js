// // app/api/manufacturing-orders/create/route.js
// import connect from "@/lib/mongo";
// import ManufacturingOrder from "@/model/ManufacturingOrder";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// export async function POST(req) {
//   try {
//     await connect();

//     // 1. Find the last order by reference (sort descending)
//     const lastOrder = await ManufacturingOrder.findOne().sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (lastOrder && lastOrder.moNumber) {
//       const lastNumber = parseInt(lastOrder.moNumber.split("-")[1]);
//       nextNumber = lastNumber + 1;
//     }

//     // 2. Format the next reference (MO-000001, MO-000002, etc.)
//     const newReference = `MO-${nextNumber.toString().padStart(6, "0")}`;

//     // 3. Generate a temporary ObjectId without saving
//     const tempId = new mongoose.Types.ObjectId();

//     // 4. Return the generated reference and id
//     return NextResponse.json(
//       { success: true, reference: newReference, id: tempId },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error generating order ID:", error);
//     return NextResponse.json(
//       { success: false, message: "Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
import connect from "@/lib/mongo";
import ManufacturingOrder from "@/model/ManufacturingOrder";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connect();

    let nextNumber;
    let isUnique = false;

    while (!isUnique) {
      // 1. Generate a random number (e.g., 1 to 999999)
      const randomNum = Math.floor(Math.random() * 999999) + 1;
      const candidate = `MO-${randomNum.toString().padStart(6, "0")}`;

      // 2. Check if it exists in the database
      const exists = await ManufacturingOrder.findOne({ moNumber: candidate });
      if (!exists) {
        nextNumber = randomNum;
        isUnique = true;
      }
    }

    const newReference = `MO-${nextNumber.toString().padStart(6, "0")}`;
    const tempId = new mongoose.Types.ObjectId();

    return NextResponse.json(
      { success: true, reference: newReference, id: tempId },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error generating order ID:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
