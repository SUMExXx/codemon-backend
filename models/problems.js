const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TestCaseSchema = new mongoose.Schema({
    input: {
        type: Number | String,
        required: true
    },
    expected_output: {
        type: Number | String,
        required: true
    }
});


const orderSchema = new mongoose.Schema(
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
        // solved_examples: [SolvedExampleSchema],
        // constraints: {
        //     type: String,
        //     required: true
        // },
        boilerplate: String,
        // datatype: {
        //     type: String,
        //     required: true,
        //     enum: ['number', 'string']
        // },
        test_case_show: [TestCaseSchema],
        test_case_hidden: [TestCaseSchema],
        difficulty: {
            type: String,
            default: 'Medium',
            enum: ['Easy', 'Medium', 'Hard']
        }
    } 
);

module.exports = mongoose.model("Order", orderSchema);