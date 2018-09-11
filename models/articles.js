var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

var Articles = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        unique: [true, 'Title is already in use']
    },
    slug: {
        type: String,
        required: [true, 'Please enter a short and descriptive slug'],
        unique: [true, 'Slug is already in use']
    },
    keywords: String,
    description: String,
    body: String,
    published: {
        type: Date,
        default: Date.now

    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },

});

Articles.pre('save', function(next){
    this.modified = new Date().toISOString();
    next();
});

Articles.plugin(uniqueValidator);
Articles.plugin(passportLocalMongoose);

module.exports = mongoose.model('Articles', Articles);

        