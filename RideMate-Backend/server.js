const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
  server: 'localhost',
  port: 1433,
  database: 'Ridemate',
  user: 'RideMateUser',                  // ✅ Your new SQL login
  password: 'RideMatePass123!',          // ✅ Your password
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

sql.connect(dbConfig)
  .then(pool => {
    if (pool.connected) {
      console.log('✅ Connected to SQL Server');
    }

    app.get('/', (req, res) => {
      res.send('RideMate backend is working!');
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

  const authRoutes = require('./routes/authRoutes'); // ✅ ADD THIS

sql.connect(dbConfig)
  .then(pool => {
    if (pool.connected) {
      console.log('✅ Connected to SQL Server');
    }

    // ✅ ADD THIS BLOCK
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
      res.send('RideMate backend is working!');
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  }); 
