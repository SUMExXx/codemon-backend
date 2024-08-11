const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    expected_output: {
        type: String,
        required: true
    }
});


const problemSchema = new mongoose.Schema(
    {   id : {
            type : Number,
            required : true,
            trim: true,
            unique: true,
            immutable: true,
            default: uuidv4
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        boilerplate: String,
        test_case_show: [testCaseSchema],
        test_case_hidden: [testCaseSchema],
        difficulty: {
            type: String,
            default: 'Medium',
            enum: ['Easy', 'Medium', 'Hard']
        }
    } 
);

module.exports = mongoose.model("problems", problemSchema);