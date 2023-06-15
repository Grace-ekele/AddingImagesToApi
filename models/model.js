const mongoose = require('mongoose');

const familySchema = new mongoose.Schema( {
    fathersName: {
        type: String,
        required: true
    },
    mothersName: {
        type: String,
        required: true
    },
    Children: {
        type: Array,
        required: true
    },
    ChildrenImage: {
        type: Array,
        required: true
    }
}, { timestamps: true } )

const familyModel = mongoose.model( 'FamilyProfile', familySchema );
module.exports = familyModel; 