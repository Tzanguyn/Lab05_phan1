const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const products = await Product.find().populate('supplierId');
  res.render('products/index', { products });
};

exports.new = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/new', { suppliers });
};

exports.create = async (req, res) => {
  const { name, address, phone, supplierId } = req.body;
  await Product.create({ name, address, phone, supplierId });
  res.redirect('/products');
};

exports.edit = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/edit', { product, suppliers });
};

exports.update = async (req, res) => {
  const { name, address, phone, supplierId } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, address, phone, supplierId });
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
