const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

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
    }),

    delete: asyncHandler(async (req, res) => {
    }),


}
module.exports = categoryController;