export const getProfile = (req, res, mysql) => {
    const userId  = req.params.id;

    mysql
        .select('*')
        .from('users')
        .where('id', '=', userId)
        .then(data => (data.length) ? res.json(data[0]) : res.status(400).json('User not found'))
        .catch(() => res.status(400).json('Error getting user'));
}
