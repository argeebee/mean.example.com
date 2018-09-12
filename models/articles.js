var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator'),
slug = require('slug');

var Articles = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        unique: [true, 'Title must be unique']
    },
    slug: {
        type: String,
        required: [true, 'Please enter a slug'],
        unique: [true, 'Slug must be unique']
    },
    keywords: String,
    description: String,
    body: String,
    published: {
        type: Date,
        default: Date.now()

    },
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    },

});

Articles.pre('save', function(next){
    this.modified = new Date().toISOString();
    next();
});

Articles.pre('validate', function(next){
    this.slug = slug(this.title).toLowerCase();
    next();
});

Articles.plugin(uniqueValidator);

module.exports = mongoose.model('Articles', Articles);

        