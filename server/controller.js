const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {username, password, profile_pic} = req.body,
              db = req.app.get('db');
              const foundUser = await db.users.check_user({username});      
              if (foundUser[0]) {
                  return res.status(400).send('Username already in use');
            }

            let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt);

            const newUser = await db.users.register_user({username, hash, profile_pic});
              req.session.user = newUser[0];
              req.status(201).send(req.session.user);
    }, 
    
    login: async(req, res) => {
        const {username, password} = req.body,
              db = req.app.get('db');

        const foundUser = await db.user.check_user({username});
        if(!foundUser[0]) {
            return res.status(400).send('Username is not found')
        }
        
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated) {
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}