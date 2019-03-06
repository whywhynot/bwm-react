const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4],
    max: [32, "Too long.  Max is  characters 32"]
  },
  email: {
    type: String,
    min: [4],
    max: [32, "Too long.  Max is  characters 32"],
    unique: true,
    lowercase: true,
    required: "Email is required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4],
    max: [32, "Too long.  Max is  characters 32"],
    required: "Password is required"
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
