const mongoose = require('mongoose');

// Define the schema directly
const UserSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    mobile: { required: true, type: String },
    password: { required: true, type: String }
});

// Create the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
