export const getProfile = async (req, res, mysql) => {
    try {
        const userId  = req.params.id;

        const user = await mysql
            .select('*')
            .from('users')
            .where('id', '=', userId);

        if (user && user.length > 0) {
            return res.json(user[0]);
        }
        return res.status(400).json('User not found');

    } catch (err) {
        return res.status(400).json('Error getting user');
    }
}
