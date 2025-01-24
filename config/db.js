import mongoose from 'mongoose'

    const connectDB = async () => {
      try {
        if (mongoose.connection.readyState === 1) {
          console.log('Already connected to MongoDB')
          return
        }

        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/caninecompass', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log('MongoDB connected successfully')
      } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
      }
    }

    export default connectDB
