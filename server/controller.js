const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {username, password, profile_pic} = req.body,
            db = req.app.get('db');

            const foundUser = await db.users.check_user({username});      
            if (foundUser[0]) {
                return res.status(409).send('Username already in use');
            }

            let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt);

            const newUser = await db.users.register_user({username, hash, profile_pic});
            req.session.user = newUser[0];
            res.status(201).send(req.session.user);
    }, 
    
    login: async(req, res) => {
        const {username, password} = req.body,
              db = req.app.get('db');
              const foundUser = await db.users.check_user({username});  //user
              if(!foundUser[0]) {
                  return res.status(400).send('Username is not found')
                }
                
                const authenticated = bcrypt.compareSync(password, foundUser[0].password);
                if(!authenticated) {
                    return res.status(401).send('Password is incorrect')
                }
                
                delete foundUser[0].password;
                req.session.user = foundUser[0];
                console.log('hit login',req.session.user)
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
///////////////////////////////////////////////////////////////////////// posts ///////////
    createPost: (req, res) => {
        console.log(req.session)
        const author_id = req.session.user.id;
        const {content} = req.body
        const db = req.app.get('db');

        db.post.create_post(content, author_id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send("couldn't save post")
            console.log(err)
        });
    },
    getUserPost: (req, res) => {
        const {id} = req.session.user;
        const db = req.app.get('db');
console.log('hit getUSerPost',req.session)
        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => {
            res.status(500).send(err)
            console.log(err);
        });
    },
    deletePost: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db');

        db.post.delete_post(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    updatePost: (req, res) => {
        const {id} = req.params
        const {content} = req.body
        const db = req.app.get('db')
console.log(id,content)
        db.post.update_post({content, id})
        .then(post => res.status(200).send(post))
        .catch(err => console.log(err));
    }

}