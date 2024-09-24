import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let names = ["Michael", "Manny"];

app.get("/", (req, res) => {
	res.render("index.ejs", { title: "Hero Connect", names });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
