import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Welcome to Hero Connect");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
