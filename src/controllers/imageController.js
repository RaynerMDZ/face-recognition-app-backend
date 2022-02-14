import Clarifai from 'clarifai';

const clarifaiApiKey = process.env.CLARIFAI_API_KEY;
const app = new Clarifai.App({apiKey: clarifaiApiKey});

export const handleApiCall = (req, res) => {
    const { input } = req.body;

    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to call Clarifai api.'));
}

export const incrementEntries = (req, res, mysql) => {
    const { id } = req.body;

    mysql('users')
        .where('id', id)
        .increment('entries', 1)
        .then(() =>
            mysql
                .select('entries')
                .from('users')
                .where('id', id)
                .then(data => res.json(data[0].entries)))
        .catch(() => res.status(400).json('Unable to get entries.'));
}
