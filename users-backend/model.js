import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id; // ta bort _id när vi skickar (detta ersätter med id istället)
    delete converted.__v; // ta bort __v när vi skickar
  },
});

const usersSchema = new mongoose.Schema({
  name: String,
  friends: Array,
});

export default mongoose.model("Users", usersSchema); // skapa model och exportera
