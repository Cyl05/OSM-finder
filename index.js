import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/about.html"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});