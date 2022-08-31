import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const PORT = 8080
const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'static','index.html'));
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
