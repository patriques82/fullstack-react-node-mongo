import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Users from "./model.js";

const app = express();
app.use(cors()); // middleware för att tillåta extern kommunikation
app.use(bodyParser.json()); // middleware för att kunna ta emot json format

app.get("/users", async (req, resp) => {
  const users = await Users.find(); // hämta alla users från databas
  resp.status(200).json(users);
});

app.get("/users/:id", async (req, resp) => {
  const { id } = req.params;
  const user = await Users.findOne({ _id: id }); // hämta alla users från databas
  // hämta alla vänner som finns in user.friends array ["bs34", "y76r"]
  const query = { _id: { $in: user.friends } };
  const friends = await Users.find(query);
  // byt ut friends från
  //    id  ["bs34", "y76r"] till
  //    objekt [{ id: "bs34", name: "Johan"}, { id: "y76r", name: "Kalle"}]
  user.friends = friends;
  resp.status(200).json(user);
});

app.delete("/users/:id", async (req, resp) => {
  const { id } = req.params;
  const deletedUser = await Users.findByIdAndDelete(id); // ta bort en user från databas
  await Users.updateMany({ friends: id }, { $pull: { friends: id } }); // ta bort vän från andras vänlistor
  resp.status(200).json(deletedUser);
});

app.put("/users/:id", async (req, resp) => {
  const { id } = req.params;
  await Users.updateOne({ _id: id }, req.body); // uppdatera en user i databas
  const updatedUser = await Users.findById(id); // sedan hämta uppdaterad note från databas
  // hämta alla vänner som finns in user.friends array ["bs34", "y76r"]
  const query = { _id: { $in: updatedUser.friends } };
  const friends = await Users.find(query);
  // byt ut friends från
  //    id  ["bs34", "y76r"] till
  //    objekt [{ id: "bs34", name: "Johan"}, { id: "y76r", name: "Kalle"}]
  updatedUser.friends = friends;
  resp.status(200).json(updatedUser);
});

app.post("/users", async (req, resp) => {
  const user = new Users(req.body);
  const savedUser = await user.save(); // spara en note i databas
  resp.status(201).json(savedUser);
});

const start = async () => {
  try {
    const dbUrl = "mongodb://localhost:27017/dbusers";
    await mongoose.connect(dbUrl); // connecta med databas via url (detta kan vara atlas)
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    // om något blir fel i connection stoppa server
    console.error(error);
    process.exit(1);
  }
};
start();
