const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required."]
    },
    email: {
        type: String,
        required: [true, "E-mail is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please, enter a valid email address."
        },
        unique: true 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    }

}, {timestamps: true, versionKey: false})


UserSchema.virtual('confirmPassword')
    .get( ()=> this._confirmPassword )
    .set( value => this._confirmPassword = value );



UserSchema.pre('validate', function(next) {
    if(this.password != this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords does not match. Please verify them');
    }

    next();
});


UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10) 
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("users", UserSchema);
module.exports = User;