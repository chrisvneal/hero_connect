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
const appName = "Hero Connect";

//  Function that retrieves character data from Superhero API
let getCharacterData = async (character) => {
	let response;

	// if users provide text, the query string should be concatenated with "search/"
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

// When project loads, display random character before first selection is made
app.get("/", async (req, res) => {
	try {
		const randomHeroID = Math.floor(Math.random() * 732 + 1);

		const characterData = await getCharacterData(randomHeroID);
		res.render("index.ejs", { title: appName, data: characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
});

// Perform API search based on name provided to input
app.post("/", async (req, res) => {
	let searchedName;
	try {
		if (req.body.heroname) {
			searchedName = req.body.heroname;
		} else {
			searchedName = Math.floor(Math.random() * 732 + 1);
		}
		const characterData = await getCharacterData(searchedName);

		res.render("index.ejs", {
			title: appName,
			data: characterData,
		});
	} catch (error) {
		res.status(500).send("An error occurred while searching for the hero.");
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
