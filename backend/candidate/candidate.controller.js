const CandidateModel = require("./candidate.model");

exports.getAllCandidates = async (req, res) => {
    let response;

    try {
        const candidates = await CandidateModel.getAllCandidates();
        if (!candidates) {
            response = {
                success: false,
                error: false,
                message: "No candidates in the database!"
            }
            return res.status(200).send(response);
        }

        const updatedCandidates = candidates.map((candidate) => {
            return {
                name: candidate.name,
                imageURL: candidate.imageURL
            }
        })

        response = {
            success: true,
            error: false,
            message: "Candidates found!",
            candidates: updatedCandidates
        }
        res.status(200).send(response);

    } catch (e) {
        response = {
            success: false,
            error: true,
            message: e.message
        }
        res.status(500).send(response);
    }
}