const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'config.env' });

// Define the connection URL
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
    .then(() => {
        console.log('Database is Connected Successfully');
    })
    .catch((error) => {
        console.error('Failed to Connect Database', error);
        // Handle the error as needed, e.g., throw an exception or exit the application
        process.exit(1);
    });

// Define your schema
const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
});

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true},
    courses: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
});

// Create the model
const collection  = mongoose.model('users', LoginSchema);
const FormModel = mongoose.model('form', formSchema);

// Export the models
module.exports = {
    collection,
    FormModel,
};
