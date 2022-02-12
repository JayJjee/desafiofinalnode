const neDB = require('../configurations/database')
const api = {}

api.save = (request, response) => {
    const canonical = request.body
    neDB.insert(canonical, (exception, cards) => {
        if(exception) { // undefined ele é igual a false
            const setence = 'CANT SAVE'
            console.error(setence, exception)

            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        console.log('CARD SAVED', cards)
        response.status(201)
        response.json(cards)
    })
}

api.findAll = (request, response) => {
    neDB.find({}).sort({ name: 1 }).exec((exception, cards) => {
        if (exception) {
          const setence = "CANT LIST";
          console.error(setence, exception);
  
          response.status(exception.status | 400);
          response.json({ mensagem: setence });
        }
        console.log("LISTED CARDS", cards);
        response.json(cards);
      });
};

api.findOne = (request, response) => {
    neDB.findOne({ _id: request.params.id }).sort({ name: 1 }).exec((exception, cards) => {
        if (exception) {
          const setence = "CANT LIST";
          console.error(setence, exception);
  
          response.status(exception.status | 400);
          response.json({ mensagem: setence });
        }
        console.log("LISTED CARDS", cards);
        response.json(cards);
      });
  };

api.delete = (request, response) => {
    neDB.remove({ _id: request.params.id }, {}, (exception, customers) => {
    if (exception) {
        const setence = "CANT REMOVE";
        console.error(setence, exception);

        response.status(exception.status | 400);
        response.json({ mensagem: setence });
    }
    console.log("CARD REMOVED", customers);

    response.json(customers);
    });
};

api.update = (request, response) => {
    neDB.update({ _id: request.params.id }, {request:request.body.request}, (exception, customers) => {
        if (exception) {
          const setence = "CANT UPDATE";
          console.error(setence, exception);
  
          response.status(exception.status | 400);
          response.json({ mensagem: setence });
        }
        console.log("Customer Listado com sucesso", customers);
        response.json(customers);
    });
};

module.exports = api