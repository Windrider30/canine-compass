import mongoose from 'mongoose'

    const breedSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      temperament: { type: String },
      life_span: { type: String },
      origin: { type: String },
      weight: {
        imperial: { type: String },
        metric: { type: String }
      },
      height: {
        imperial: { type: String },
        metric: { type: String }
      },
      bred_for: { type: String },
      breed_group: { type: String },
      image_url: { type: String },
      wikipedia_url: { type: String },
      isFamilyFriendly: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    })

    export default mongoose.models.Breed || mongoose.model('Breed', breedSchema)
