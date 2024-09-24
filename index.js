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

app.get("/", async (req, res) => {
	try {
		// on default load, start with random character selected
		const randomHeroID = Math.floor(Math.random() * 732 + 1);

		const characterData = await getCharacterData(randomHeroID);
		res.render("index.ejs", { title: "Home Connect", data: characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
});

app.post("/herosearch", async (req, res) => {
	try {
		const searchedName = req.body.heroname;
		const characterData = await getCharacterData(searchedName);

		res.render("index.ejs", {
			title: "Home Connect",
			data: characterData,
		});
	} catch (error) {
		console.error(`There was an error: ${error}`);
		res.status(500).send("An error occurred while searching for the hero.");
	}
});

app.post("/random", async (req, res) => {
	try {
		// on default load, start with random character selected
		const randomHeroID = Math.floor(Math.random() * 732 + 1);

		const characterData = await getCharacterData(randomHeroID);
		res.render("index.ejs", { title: "Home Connect", data: characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
});

let getCharacterData = async (character) => {
	let response;

	// if users text it should be concatenated with "search"
	if (isNaN(character)) {
		character = `search/${character}`;

		response = await axios.get(`${url}${character}`);
		response = response.data.results[0];
	} else {
		// if the function receives an 'id', retrieve from data.results
		response = await axios.get(`${url}${character}`);
		response = response.data;
	}

	return response;
};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
