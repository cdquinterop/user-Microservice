const { db } = require("../config/cnn");
const bcrypt = require('bcryptjs');


/*Create User*/
const createUser = async (req, res) => {

    try {
        const {name, lastName, user, password, email} = req.body


            // Check if the email is already registered
        const emailExisting = await db.oneOrNone('SELECT * FROM usuarios WHERE correo = $1', [email]);
        if (emailExisting) {
            return res.status(400).json({ message: 'The email is already registered' });
        }

        // Check if the user is already registered
        const userExisting = await db.oneOrNone('SELECT * FROM usuarios WHERE usuario = $1', [user]);
        if (userExisting) {
            return res.status(400).json({ message: 'The user is already registered' });
        }

        // Encrypt the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert the new user in the database
        const response = await db.one(
            'INSERT INTO usuarios (nombre, apellido, usuario, contrasena, correo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, lastName, user, hashedPassword, email]
        );
        res.json(response);
    }catch (error) {
    res.status(500).json({ message: error });
  }
}

/* Login User */

const loginUser = async (req, res) => {
    try {
        const { user, password } = req.body;

         // Search for the user by user name or email in the database
         const UserFound = await db.oneOrNone('SELECT * FROM usuarios WHERE usuario = $1 OR correo = $1', [user]);
         if (!UserFound) {
             return res.status(401).json({ message: 'Invalid credentials' });
         }

        // Compare the provided password with the stored password
        const passwordValid = await bcrypt.compare(password, UserFound.password);
        if (!passwordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Successful login' });

    } catch (error) {
        //console.error('Server error when logging in:', error.message);
        res.status(500).json({ message: 'Server error when logging in' });
    }
};

module.exports ={
    createUser,
    loginUser
}