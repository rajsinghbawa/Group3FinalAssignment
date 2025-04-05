const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');
const { authorizeRoles } = require('./middleware/roleMiddleware');
const businessRoutes = require('./routes/businessRoutes');
const financialRoutes = require('./routes/financialRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/financials', financialRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);
// Dummy RBAC test routes
app.get('/api/business-only', protect, authorizeRoles('business'), (req, res) => {
  res.json({ message: 'Hello Business, you are authorized!' });
});

app.get('/api/user-only', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Hello General User, you are authorized!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
