'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { DB_URL, DB_NAME } = require('./consts.json');

const taskSchema = new Schema({
    description: { type: String, required: true },
    isDone: Boolean
});

const Task = model('Task', taskSchema);

mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`connected`);
    }
})

module.exports = { "Task": Task };