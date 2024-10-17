import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
