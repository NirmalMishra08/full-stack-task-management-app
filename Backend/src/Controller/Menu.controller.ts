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

export async function updateMenu(req:any,res:any) {
    try {
        const { name, category, price, availability } = req.body;
        const id = req.params.id;
        if(!id){
            return res.status(400).json({ message: "Please provide menu item ID" })
        }
        const updatedMenu = await menuModel.updateOne(
            { _id: req.params.id }, // Find menu item by ID
            {
              $set: {
                ...(name && { name }),
                ...(category && { category }),
                ...(price && { price }),
                ...(availability !== undefined && { availability }),
              },
            },
            { new: true }
          );
          if(updatedMenu.modifiedCount==0){
            return res.status(400).json({
                message:"Not Modified the Menu item"
            })
          }
          return res.status(200).json({ message: "Menu item updated successfully" ,updatedMenu});

    } catch (error) {
        return res.status(400).json({message:((error) as Error).message})
    }
}

export async function deleteMenuItem (req:any,res:any){
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({ message: "Please provide menu item ID" })
        }
        const deletedMenu = await menuModel.deleteOne({_id: req.params.id});
        if(deletedMenu.deletedCount==0){
            return res.status(400).json({
                message:"Menu item not found"
            })
        }
        return res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        return res.status(400).json({message:((error) as Error).message})
    }
}