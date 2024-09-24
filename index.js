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
