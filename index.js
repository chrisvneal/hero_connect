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
		const randomHeroID = Math.floor(Math.random() * 732 + 1);

		const characterData = await getCharacterData(randomHeroID);
		res.render("index.ejs", { title: "Home Connect", data: characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
});

let getCharacterData = async (heroId) => {
	const response = await axios.get(`${url}${heroId}`);
	return response.data;
};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
