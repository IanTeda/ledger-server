'use strict';
const crypto = require('crypto')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Database Validation Error - Users name cannot be empty.'
        },
        notNull: {
          msg: 'Database Validation Error - Users name cannot be null.',
        },
        len: {
            args: [3, 72],
            msg: 'Database Validation Error - Users name must between 3 and 72 characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Database Validation Error - User email is already taken.'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Database Validation Error - User email format, use <foo@bar.com>.'
        },
        notEmpty: {
          msg: 'Database Validation Error - User email cannot be empty.'
        },
        notNull: {
          msg: 'Database Validation Error - User email cannot be null.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Using a method prevents it from showing up on queries like findAll() or findById(1)
      get() {
        return() => this.getDataValue('password');
      },
      validate: {
        notNull: {
          msg: 'Database Validation Error - User password cannot be null.'
        },
        notEmpty: {
          msg: 'Database Validation Error - User password cannot be empty.'
        },
        len: {
            args: [5, 72],
            msg: 'Database Validation Error - User password must between 5 and 72 characters.'
        }
      }
    },
    salt: {
      type: DataTypes.STRING,
      // Using a method prevents it from showing up on queries like findAll() or findById(1)
      get() {
        return() => this.getDataValue('salt')
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }

  User.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
  }

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  User.prototype.authenticate = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
  }

  return User;
};

// https://medium.com/@benjaminpwagner/using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9
// https://www.howtobuildsoftware.com/index.php/how-do/QJa/sequelizejs-sequelize-bulk-update-different-behaviour