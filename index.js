import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;
const baseURL = "https://superheroapi.com/api/";
const url = `${baseURL}${API_KEY}/`;

let names = [];

app.get("/", (req, res) => {
	// getData(req, res);
	res.render("index.ejs", { title: "Home Connect" });
});

// let characterData;

let getCharacterData = async (req, res) => {
	try {
		const response = await axios.get(`${url}${25}`);
		const characterData = response.data;
		// names.push(data.name);
		res.render("index.ejs", { title: "Hero Connect", characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
