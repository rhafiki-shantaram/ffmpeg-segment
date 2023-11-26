const express = require(`express`);
const app = express();
const bodyParser = require('body-parser');
const segmentAudio = require('./segmentLogic');

const PORT = process.env.port || 4000;

app.use(bodyParser.json());

app.post('/segment', async (req, res) => {
    const { url, timestamp } = req.body;

    try {
        const segmentBuffer = await segmentAudio(url, timestamp);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(segmentBuffer);
    } catch (error) {
        console.error('Error processing audio segment:', error);
        res.status(500).send('Error processing audio segment');
    }
});

app.get("/", (req, res) => {
    res.send(`Render puppeteer server is up and running;`)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});