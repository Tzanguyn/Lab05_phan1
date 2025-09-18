const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ DB error:", err));

// ✅ Middleware
app.use(express.json()); // để Postman gửi JSON
app.use(express.urlencoded({ extended: true })); // để form HTML gửi data
app.use(methodOverride('_method')); // hỗ trợ PUT/DELETE từ form
app.use(morgan('dev')); // log request
app.use(express.static(path.join(__dirname, 'public')));

// ✅ View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Routes
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

app.get('/', (req, res) => res.render('index'));
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));