const mongoose = require("../services/mongoose_service").mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    auth0_id: String,
    voted: Boolean,
    selection: Number
})

const User = mongoose.model("user", userSchema, "user");

exports.findByAuth0Id = (id) => {
    return User.findOne({ auth0_id: id});
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.updateUser = (userData) => {
    return User.updateOne(
        { auth0_id: userData.auth0_id }, 
        { $set: { 
                voted: userData.voted,
                selection: userData.selection
            }
        }
    );
};