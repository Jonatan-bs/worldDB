const mongoose = require("mongoose");
var spawn = require("child_process").spawn;

module.exports = {
  create(req, res, next) {
    const collection = req.params.collection;

    model = mongoose.models[collection];

    if (model) {
      const newDocument = new model({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
      });

      newDocument
        .save()
        .then(() => {
          res.status("201").json({
            message: "Document created",
            createdDocument: newDocument
          });
        })
        .catch(err => res.status("500").json(err));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  delete(req, res, next) {
    const collection = req.params.collection;
    const id = req.params.id;

    model = mongoose.models[collection];

    if (model) {
      model
        .deleteOne({ _id: id })
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  update(req, res, next) {
    const collection = req.params.collection;
    const id = req.params.id;

    model = mongoose.models[collection];

    if (model) {
      model
        .updateOne({ _id: id }, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  retrieve(req, res, next) {
    const collection = req.params.collection;
    let schema = mongoose.models[collection].schema.obj;

    const body = req.body;
    const query = body.query ? body.query : {};
    const options = body.options ? body.options : {};
    const fields = body.fields ? body.fields : null;

    model = mongoose.models[collection];
    if (model) {
      model
        .find(query, fields, options)
        .then(result => res.send([result, schema]))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  getSchema(req, res, next) {
    const collection = req.params.collection;
    const schema = mongoose.models[collection].schema.paths;
    res.send(schema);
  }
};
