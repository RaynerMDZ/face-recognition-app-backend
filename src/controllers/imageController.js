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

export const incrementEntries = async (req, res, mysql) => {
    try {
        const { id } = req.body;

        await mysql('users').where('id', id).increment('entries', 1);
        const results =  await mysql.select('entries').from('users').where('id', id);

        if (results && results.length > 0) {
            return res.status(200).json(results[0].entries);
        }

        return res.status(400).json({message: 'User not found'});
    }
    catch (err) {
        res.status(400).json('Unable to get entries.')
    }
}
