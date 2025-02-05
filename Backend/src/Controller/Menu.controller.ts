// GET /menu: Fetch all menu items.
// POST /menu: Add a new menu item.

import menuModel from "../Model/menu.model";

export async function getMenuItems(req: any, res: any) {
    try {
        const menuItems = await menuModel.find({});
        return res.status(200).json({ message: "Menu items found", menuItems })
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while fetching menu items: " + ((err) as Error).message })
    }
}

export async function addMenuItem(req: any, res: any) {
    try {
        const { name, category, price, availability } = req.body;
        if(!name||!category||!price||!availability){
            return res.status(400).json({ message: "Please provide all required fields (name, category, price, availability)" })
        }

        const newMenuItem = await menuModel.create({ name, category, price, availability });
        return res.status(200).json({ message: "Menu item added successfully", newMenuItem });

    } catch (error) {
     return res.status(400).json({message:((error) as Error).message})
    }
}