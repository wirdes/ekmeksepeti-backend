const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new Schema({
  name: { type: String, required: [true, "Lütfen bir isim giriniz"] },
  surname: {
    type: String,
    required: [true, "Lütfen bir soyad giriniz"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Lütfen bir email adresi giriniz",
    ],
  },
  password: {
    type: String,
    minLength: [6, "6dan küçük olamaz"],
    required: [true, "lütfen bir şifre giriniz."],
    select: false,
  },
});

AdminSchema.methods.generateJwtFromUser = function () {
  const { JWT_EXPIRE, JWT_SECRET } = process.env;
  const payload = {
    id: this.id,
    name: this.name,
    surname: this.surname,
    email: this.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
AdminSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcryptjs.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Admin", AdminSchema);
