const asyncHandler = require("../Middleware/asyncHandler.js");
const Product = require("../Models/Product.js");

const getProducts = asyncHandler(async (req,res) => {
    const keyword = req.query.keyword?{ name: { $regex: req.query.keyword, $options: 'i'}}:{};
    const category = req.query.category?{ category: req.query.category }:{};
    const page = Number(req.query.page)||1;
    const limit = Number(req.query.limit)||10;
    const skip = (page - 1)*limit;
    const filter = {...keyword,...category};
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
                                .sort({createdAt: -1})
                                .skip(skip)
                                .limit(limit);
      res.status(200).json({
                success: true,
                count: products.length,
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                data: products});
});

const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product){ res.status(404); throw new Error("Product not found!");}
    res.status(200).json({ success: true , data: product});    
});

const createProduct = asyncHandler(async (req,res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product});
});

const updateProduct = asyncHandler(async (req,res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json({ success: true, data: product});
});

const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) { res.status(404); throw new Error("Product nahi mila!");}
    res.status(200).json({ success: true, message: "Product delete ho gaya!"});
});

const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found!');}
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if(alreadyReviewed) { res.status(400); throw new Error('Already reviewed!');}
    const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment};
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0)/product.reviews.length;
    await product.save();
    res.status(201).json({ success: true, message: 'Review added!' });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createReview };