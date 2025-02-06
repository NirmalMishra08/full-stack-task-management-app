import menuModel from "../Model/menu.model";
import orderModel from "../Model/order.model";

export async function placeOrder(req: any, res: any) {
    try {
        const { items } = req.body;
        const userId = req.userId.id;
        console.log(userId)
        if (!items || !Array.isArray(items) || items.length == 0) {
            return res.status(400).json({ message: "Order must contain at least one item" });
        }
        let totalPrice = 0;
        for(const item of items){
            const menuItem = await menuModel.findById(item.menuItem);
            if(!menuItem){
                return res.status(404).json({ message: `Menu item ${item.menuItem} not found` });
              
            }
            totalPrice += menuItem.price*item.quantity;
        }
        const newOrder = await orderModel.create({ userId, items, totalAmount:totalPrice });
        return res.status(200).json({ message: "Order placed successfully", newOrder });

     } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        }
    }
    export const getOrders = async (req: any, res: any) => {
        try {
          const userId = req.userId.id;
      
          const orders = await orderModel.find({ userId }).populate("items.menuItem");
          res.status(200).json({ orders });
        } catch (error) {
          res.status(500).json({ message: (error as Error).message });
        }
      };