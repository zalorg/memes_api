import { initializeApp, credential } from 'firebase-admin'
import * as express from 'express'
import router from './router'
// import fetchSubreddits from './functions/fetchSubreddits'

initializeApp({
    credential: process.env.CODESPACES ? credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)) : credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
    databaseURL: 'https://memes-api-cache.europe-west1.firebasedatabase.app/'
})

const app = express();

app.use(express.json())
app.use(router);

// fetchSubreddits('memes')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Memes API listening on port ${PORT}!`);
});
