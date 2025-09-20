import connect from "@/lib/mongo";
import ManufacturingOrder from '../../../model/ManufacturingOrder';
import StockLedger from '../../../model/StockLedger';
import Bom from '../../../model/Bom';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await connect();

  switch (method) {
    // GET A SPECIFIC MANUFACTURING ORDER
    case 'GET':
      try {
        const order = await ManufacturingOrder.findById(id)
          .populate('productToManufacture')
          .populate({
            path: 'bom',
            populate: {
              path: 'components.product',
              model: 'Product',
            },
          });
          // .populate('workOrders'); // Assuming you have a WorkOrder model linked

        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // UPDATE A MANUFACTURING ORDER (STATE TRANSITIONS)
    case 'PUT':
      try {
        const { action, payload } = body; // e.g., { action: 'confirm' } or { action: 'start_work_order', workOrderId: '...' }

        const order = await ManufacturingOrder.findById(id);
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // --- CORE LOGIC FOR STATE TRANSITIONS ---

        if (action === 'confirm' && order.state === 'Draft') {
          // 1. Find the BOM
          const bom = await Bom.findById(order.bom).populate('components.product');
          if (!bom) throw new Error('BOM not found for this order.');

          // 2. Check stock for all components
          let isAvailable = true;
          for (const component of bom.components) {
            const requiredQty = component.quantity * order.quantityToProduce;
            const stockItem = await StockLedger.findOne({ product: component.product._id });
            if (!stockItem || stockItem.quantityOnHand < requiredQty) {
              isAvailable = false;
              break;
            }
          }
          
          if (!isAvailable) {
            order.componentStatus = 'Not Available';
            await order.save();
            return res.status(400).json({ success: false, message: 'Insufficient stock for components.', data: order });
          }

          // 3. If stock is available, reserve it
          for (const component of bom.components) {
              const requiredQty = component.quantity * order.quantityToProduce;
              // Simple reservation: just decrementing stock. A better system might have a "reserved" field.
              await StockLedger.updateOne({ product: component.product._id }, { $inc: { quantityOnHand: -requiredQty } });
          }

          order.componentStatus = 'Available';
          order.state = 'Confirmed';
        } 
        else if (action === 'start' && order.state === 'Confirmed') {
            order.state = 'In-Progress';
            // Here you would also update the first work order's state
        }
        else if (action === 'produce' && order.state === 'To Close') {
            // This action confirms production is finished.
            // 1. Raw material stock was already decremented/reserved at 'confirm' step.
            // 2. Now, increase the stock of the finished good.
            await StockLedger.updateOne(
                { product: order.productToManufacture },
                { $inc: { quantityOnHand: order.quantityToProduce } },
                { upsert: true } // Creates the stock record if it doesn't exist
            );
            order.state = 'Done';
        }
        else if (action === 'cancel') {
            // If order was confirmed, we need to return the reserved stock
            if (order.state === 'Confirmed' || order.state === 'In-Progress') {
                const bom = await Bom.findById(order.bom);
                for (const component of bom.components) {
                    const reservedQty = component.quantity * order.quantityToProduce;
                    await StockLedger.updateOne({ product: component.product }, { $inc: { quantityOnHand: reservedQty } });
                }
            }
            order.state = 'Canceled';
        } 
        else {
            return res.status(400).json({ success: false, message: 'Invalid action or state.' });
        }

        await order.save();
        
        // Fetch the fully populated order to return to the frontend
        const updatedOrder = await ManufacturingOrder.findById(id)
          .populate('productToManufacture')
          .populate({ path: 'bom', populate: { path: 'components.product', model: 'Product' } });
        
        res.status(200).json({ success: true, data: updatedOrder });

      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}