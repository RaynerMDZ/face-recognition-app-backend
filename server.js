import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import cors from 'cors';
import { register } from "./src/controllers/registerController.js";
import { signIn } from "./src/controllers/signInController.js";
import { getProfile } from "./src/controllers/profileController.js";
import { incrementEntries, handleApiCall } from "./src/controllers/imageController.js";
import { knexConfig } from "./src/config/knexConfig.js";

const mysql = knexConfig;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/sign-in', (req, res) => signIn(req, res, mysql, bcrypt));

app.post('/register', (req, res) => register(req, res, mysql, bcrypt));

app.get('/profile/:id', (req, res) => getProfile(req, res, mysql));

app.put('/image', (req, res) => incrementEntries(req, res, mysql));

app.post('/imageUrl', (req, res) => handleApiCall(req, res));

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`)
});
