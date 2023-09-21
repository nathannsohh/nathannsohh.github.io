const CandidateController = require('./candidate.controller');

exports.routesConfig = (app) => {
    app.get('/candidates', [
        CandidateController.getAllCandidates
    ]);
}