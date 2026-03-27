// Server Entry Point
// Starts the Express server

require('dotenv').config();
const { app, connectDB } = require('./app');

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      console.log(`
========================================
  🚀 MAITRI Server Started
========================================
  🌐 Server URL: http://localhost:${PORT}
  📦 Environment: ${process.env.NODE_ENV}
  ✓ Ready to accept requests
========================================
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start the server
startServer();
