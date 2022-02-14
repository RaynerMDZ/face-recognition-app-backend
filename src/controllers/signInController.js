import bcrypt from "bcryptjs";

export const signIn = (req, res, mysql) => {
    if (req.body) {

        let {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json('Incorrect form submission.')
        }

        email = email.toLowerCase();

        mysql
            .select('*')
            .from('login')
            .where('email', email)
            .then(user => {
                if (user.length) {
                    if (bcrypt.compareSync(password, user[0].password)) {
                        mysql
                            .select('*')
                            .from('users')
                            .where('id', user[0].id)
                            .then(data => res.json(data[0]));
                    } else {
                        return res.status(401).json('Not Authorized Hacker.')
                    }
                } else {
                    return res.status(401).json('Not Authorized Hacker.');
                }
            })
            .catch(() => res.status(400).json('No data was sent.'));
    }
}
