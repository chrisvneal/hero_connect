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

<<<<<<< HEAD
app.get("/", async (req, res) => {
	try {
		const characterData = await getCharacterData();
=======
app.get("/", (req, res) => {
	getCharacterData(req, res);
	// res.render("index.ejs", { title: "Home Connect" });
});

// let characterData;

let getCharacterData = async (req, res) => {
	const randomHeroID = Math.floor(Math.random() * 732) + 1;
	try {
		const response = await axios.get(`${url}${randomHeroID}`);
		const characterData = response.data;
		// names.push(data.name);
>>>>>>> 0f6018f4fe0cbdf448b2ebcd0bb4f515da512609
		res.render("index.ejs", { title: "Hero Connect", data: characterData });
	} catch (error) {
		console.error(`There was an error: ${error}`);
	}
});

let getCharacterData = async () => {
	const randomHeroID = Math.floor(Math.random() * 732 + 1);
	const response = await axios.get(`${url}${randomHeroID}`);
	return response.data;
};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
