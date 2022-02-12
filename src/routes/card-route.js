const api = require('../controllers/card-controllers')

module.exports = (app) => {
    app.route('/cards')
        .post(api.save)
        .get(api.findAll)
    app.route('/cards/:id')
        .get(api.findOne)
        .put(api.update)
        .delete(api.delete)
        .get(api.pageNSort)
}