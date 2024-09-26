const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

const transactionController = {
    // Add
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if (!amount || !type || !date) {
            throw new Error("Type, amount and date are required");
        }

        // Create
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            description
        });

        res.status(201).json(transaction)
    }),




    // *Lists
    getFilteredTransactions: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;

        // A filters object is created to store filtering criteria.
        //     It's initialized with the user ID (req.user). This ensures only transactions belonging to the logged-in user are retrieved.
        let filters = { user: req.user }

        //         Date Range Filter:
        // If startDate is provided, filters transactions with dates greater than or equal to the start date.
        // If endDate is provided, filters transactions with dates less than or equal to the end date.

        // If startDate exists, it adds a filter to the filters object for the date field using the spread syntax (...).This ensures other potential filters on date are preserved.
        if (startDate) {
            filters.date = { ...filters.date, $gte: new Date(startDate) };
        }

        if (endDate) {
            filters.date = { ...filters.date, $lte: new Date(endDate) };
        }

        if (type) {
            // If type is provided, filters transactions by the specified type.
            filters.type = type;
        }


        if (category) {
            if (category === "All") {
                //! No category filter needed when filtering for 'All' 
            } else if (category === "Uncategorized") {
                // filter for transaction that are specifically categorized as 'Uncategorized'
                filters.category = 'Uncategorized';
            } else {
                filters.category = category
            }
        }
        const transactions = await Transaction.find(filters).sort({ date: -1 });
        res.json(transactions)

    }),


    // ! UPDATE
    update: asyncHandler(async (req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction && transaction.user.toString() === req.user.toString()) {
            (transaction.type = req.body.type || transaction.type);
            (transaction.category = req.body.category || transaction.category);
            (transaction.amount = req.body.amount || transaction.amount);
            (transaction.date = req.body.date || transaction.date);
            (transaction.description = req.body.description || transaction.description);

            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction);
        }
    }),

    delete: asyncHandler(async (req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction && transaction.user.toString() === req.user.toString()) {
            await Transaction.findByIdAndDelete(req.params.id)
            res.json({ message: "Transaction removed" })
        }

    }),


}
module.exports = transactionController;