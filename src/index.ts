import { initializeApp, credential } from 'firebase-admin'
import * as express from 'express'
import router from './router'
import fetchSubreddits from './functions/fetchSubreddits'


initializeApp({
    credential: credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)),
    databaseURL: 'https://memes-api-cache.europe-west1.firebasedatabase.app/'
})

const app = express();


app.use(router);

// fetchSubreddits()

app.listen(3000, () => {
    console.log('Memes API listening on port 3000!');
})