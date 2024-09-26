const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if (!name || !type) {
            throw new Error("Name and type are required for creating a category");
        }

        // Convert the name to lowercase
        const normalizedName = name.toLowerCase();
        const validTypes = ["income", "expense"];
        if (!validTypes.includes(type.toLowerCase())) {
            throw new Error("Invalid category type " + type);
        }


        // check if category already exist on the user
        const categoryExists = await Category.findOne({
            name: normalizedName,
            user: req.user
        });

        if (categoryExists) {
            throw new Error(
                `Category ${categoryExists.name} already exists in the database.`
            )
        }
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        });
        res.status(201).json(category);

    }),




    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({ user: req.user });

        res.status(200).json(categories);
    }),

    update: asyncHandler(async (req, res) => {
        const {categoryId} = req.params;
       
        const {type, name} = req.body;
        const normalizedName= name.toLowerCase();

        // Finds the category by its ID using the Category model.
        const category = await Category.findById(categoryId)
        // Checks if the category exists and if the current user is authorized to update it.
        if(!category && category.user.toString() !== req.user.toString()) {
                throw new Error("Category not found or user not authorized");
        }

        // Stores the original category name, which is the initia name it was having before.

        const oldName = category.name;


        // Update category propertise, to what you are typing in, in the form.
        category.name = normalizedName || name
        category.type = type || category.type;


        // Saves the updated category to the database.
        const updatedCategory = await category.save();

        // Update affected transaction
        // Checks if the category name has changed.
        // When a category's name is updated, all transactions that had the old category name need to be updated with the new category name to ensure data consistency.

//         The updateMany() function will find all the transactions that:
// Belong to the logged -in user(req.user).
// Are currently categorized under "Food"(which is oldName).
// Once the transactions are found, it will update their category field to "Yes"(the new category name).
        if(oldName !== updatedCategory.name){
            await Transaction.updateMany({
                user:req.user,
                category: oldName
            },
            {
                //  Set the 'category' field to the name u are changing it to.

                $set: {category : updatedCategory.name}
            }
        );
        }
        res.json(updatedCategory);
    }),


    // It also updates any transactions that were associated with the deleted category by assigning them to a default category (e.g., "Uncategorized").
    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
//         Category ownership: The category's user field is compared to the logged-in user's ID(req.user).The.toString() method is used to compare the IDs as strings, ensuring they match.
// If both conditions are met, the user is authorized to delete the category.

        if(category && category.user.toString() === req.user.toString()){
            // Update transactions that have this category.
            const defaultCategory = "Uncategorized";
            await Transaction.updateMany(
                {user: req.user, category: category.name},
                {$set: {category: defaultCategory}}
            )

            // !Remove Category
            await Category.findByIdAndDelete(req.params.id);
            res.json({
                message: "Category removed and transaction updated"
            })
        }else{
            res.json({
                message: "Category not found or user not authorized."
            })
        }
    }),


}
module.exports = categoryController;