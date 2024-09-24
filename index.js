import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = "08a2729c1ca5722f668f14f4c28e04c4";
const baseURL = "https://superheroapi.com/api/";

let names = [];

app.get("/", (req, res) => {
	getData(req, res);
});

let getData = async (req, res) => {
	try {
		const response = await axios.get(`${baseURL}${API_KEY}/23`);
		const data = response.data;
		names.push(data.name);
		res.render("index.ejs", { title: "Hero Connect", names });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
