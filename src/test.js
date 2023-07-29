const { data } = require("./cards.json");

for (let i = 0; i < data.length; i++) {
  if (data[i].name === "Dragon Revival Rhapsody") {
    console.log("Index: " + i);
  }
}

console.log("Did not find card");
