import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching Products: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSingleProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ id });
    res.status(200).json({
      success: true,
      data: product,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching Products: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide all feilds" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Data Added Successfuly",
    });
  } catch (error) {
    console.error("Error in Creat Product: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedData = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedData,
      message: "Product Update Successfuly",
    });
  } catch (error) {
    console.error("Error in Updating Product: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfuly",
    });
  } catch (error) {
    console.error("Error in Deleting Product: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
