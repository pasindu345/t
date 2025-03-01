const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/api/terabox", async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: "URL එක අවශ්‍යයි" });
    }

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $("meta[property='og:title']").attr("content") || "Unknown Title";
        let time = $("meta[property='video:duration']").attr("content") || "Unknown Duration";

        res.json({ title, time });
    } catch (error) {
        res.status(500).json({ error: "දත්ත ලබා ගැනීමට බැරි වුණා" });
    }
});

app.listen(PORT, () => console.log(`Server එක PORT ${PORT} හරහා වැඩ කරමින් පවතී`));
