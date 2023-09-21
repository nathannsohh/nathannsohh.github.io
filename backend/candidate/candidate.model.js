const mongoose = require("../services/mongoose_service").mongoose;
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: String,
    imageURL: String
});

const Candidate = mongoose.model("candidate", candidateSchema, "candidate");


exports.getAllCandidates = () => {
    return Candidate.find({});
}