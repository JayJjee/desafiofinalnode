const neDB = require('../configurations/database')
const api = {}

api.save = (req, res) => {
    const canonical = req.body
    neDB.insert(canonical, (exception, cards) => {
        if(exception) { // undefined ele é igual a false
            const setence = 'CANT SAVE'
            console.error(setence, exception)

            res.status(exception.status | 404)
            res.json({ 'mensagem': setence })
        }
        console.log('CARD SAVED', cards)
        res.status(201)
        res.json(cards)
    })
}

api.findAll = (req, res) => {
    neDB.find({}).sort({ name: 1 }).exec((exception, cards) => {
        if (exception) {
          const setence = "CANT LIST";
          console.error(setence, exception);
  
          res.status(exception.status | 404);
          res.json({ mensagem: setence });
        }
        console.log("LISTED CARDS", cards);
        res.json(cards);
      });
};

api.findOne = (req, res) => {
    neDB.findOne({ _id: req.params.id }).sort({ name: 1 }).exec((exception, cards) => {
        if (exception) {
          const setence = "CANT LIST";
          console.error(setence, exception);
  
          res.status(exception.status | 404);
          res.json({ mensagem: setence });
        }
        console.log("LISTED CARDS", cards);
        res.json(cards);
      });
  };

api.delete = (req, res) => {
    neDB.remove({ _id: req.params.id }, {}, (exception, customers) => {
    if (exception) {
        const setence = "CANT REMOVE";
        console.error(setence, exception);

        res.status(exception.status | 404);
        res.json({ mensagem: setence });
    }
    console.log("CARD REMOVED", customers);

    res.json(customers);
    });
};

api.update = (req, res) => {
    neDB.update({ _id: req.params.id }, {$set: req.body.$set}, { multi: true }, (exception, customers) => {
        if (exception) {
          const setence = "CANT UPDATE";
          console.error(setence, exception);
  
          res.status(exception.status | 404);
          res.json({ mensagem: setence });
        }
        console.log("SUCCESSFUL UPDATE", customers);
        res.json(customers);
    });
};

module.exports = api