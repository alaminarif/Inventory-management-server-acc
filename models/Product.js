const mongoose = require("mongoose");

const productShcema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provid a name"],
      trim: true,
      unique: true,
      minLength: [3, "name must be at least 3 charactaers"],
      maxLength: [100, "name to large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't nagetive value "],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litter", "pcs"],
        message: "unit value can't be {VALUE}. must be kg/litter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "can't negetive value"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "please provid a integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VLAUE}",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose midlewares
productShcema.pre("save", function (next) {
  console.log("before midleware");
  next();
});

productShcema.post("save", function (doc, next) {
  console.log("after midleware");
  next();
});
//model
const Product = mongoose.model("Product", productShcema);
module.exports = Product;
