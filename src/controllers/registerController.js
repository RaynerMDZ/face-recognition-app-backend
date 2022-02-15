import bcrypt from 'bcryptjs';

export const register = async (req, res, mysql) => {
    if (req.body) {
        // knex returns an array of objects using where. that is why I am using data[0].
        try {
            let { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json('Incorrect form submission.')
            }

            email = email.toLowerCase();
            name = name.toLowerCase();

            const user = {
                name: name,
                email: email,
                entries: 0,
                joined: new Date()
            }

            let id = await mysql('users').insert(user);

            if (Array.isArray(id)) {
                id = id[0];
            }

            await mysql('login')
                .insert({
                    id: id,
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password, 10)
                })

            const returnedUser = await mysql
                .select('*')
                .from('users')
                .where('id', '=', id);

            if (returnedUser && returnedUser.length > 0) {
                return res.json(returnedUser[0]);
            }

            return res.status(400).json({message: `Could not register user ${name}`});

        } catch (err) {
            return res.status(400).json(err);
        }
    }
};

