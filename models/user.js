const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) {
      next();
    } else {
      bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.name);
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
});

module.exports = mongoose.model('User', userSchema);