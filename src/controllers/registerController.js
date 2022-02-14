export const register = (req, res, mysql, bcrypt) => {
    if (req.body) {

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

        // knex returns an array of objects using where. that is why I am using data[0].
        mysql('users')
            .insert(user)
            .then(id => {

                mysql('login')
                    .insert({
                        id: id,
                        name: name,
                        email: email,
                        password: bcrypt.hashSync(password, 10)
                    })
                    .then(console.log);

                mysql
                    .select('*')
                    .from('users')
                    .where('id', id)
                    .then(data => res.json(data[0]));

            })
            .catch(err => res.status(400).json(err));
    }
};

