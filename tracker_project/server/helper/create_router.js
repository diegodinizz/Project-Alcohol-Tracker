const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne({ _id: ObjectID(id) })
    .then((docs) => res.json(docs))
  });

  router.post('/', (req, res) => {
    const newData = req.body;
    const newDate = {}
    newDate.date = new Date()
    .toDateString()
    // .substring(4, 15);

    const combinedData = Object.assign(newData, newDate)

    collection
    .insertOne(combinedData)
    //$setOnInsert: { dateAdded: new Date() }
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .deleteOne({ _id: ObjectID(id) })
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
    .updateOne(
      { _id: ObjectID(id) },
      { $set: updatedData }
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  return router;

};

module.exports = createRouter;
