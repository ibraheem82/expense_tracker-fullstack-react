const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const categoryController = require('../controllers/categoryCtrl');


const categoryRouter = express.Router();

// Create
categoryRouter.post("/api/v1/categories/create", isAuthenticated, categoryController.create)

// lists
categoryRouter.get("/api/v1/categories/lists", isAuthenticated, categoryController.lists)

module.exports = categoryRouter;