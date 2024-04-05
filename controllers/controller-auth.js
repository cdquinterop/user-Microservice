const { db } = require("../config/cnn");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
        const token = jwt.sign({ userId: userExisting.idUsuario }, 'tu_clave_secreta');

        res.json(response, token);
    }catch (error) {
    res.status(500).json({ message: error });
  }
}

/* Login User */

const loginUser = async (req, res) => {
    try {
        const { user, password } = req.body;
        console.log(user);
        console.log(password);

         // Search for the user by user name or email in the database
         const UserFound = await db.oneOrNone('SELECT * FROM usuarios WHERE usuario = $1 OR correo = $1', [user]);
        
         if (!UserFound) {
             return res.status(401).json({ message: 'Invalid credentials' });
         }
       
        // Compare the provided password with the stored password
        const passwordValid = await bcrypt.compare(password, UserFound.contrasena);
       
        if (!passwordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: UserFound.idUsuario }, 'tu_clave_secreta');

        res.json({ message: 'Successful login', token: token });

    } catch (error) {
        console.error('Server error when logging in:', error.message);
        res.status(500).json({ message: 'Server error when logging in' });
    }
};

/*Authenticate Token*/
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: 'Acceso no autorizado. Se requiere un token válido' });
  }
  
  const tokenWithoutBearer = token.replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, 'tu_clave_secreta');
    console.log(decodedToken);

    res.status(200).json({ message: ' token validation successful'});
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token inválido' });
  }
  };

module.exports ={
    createUser,
    loginUser,
    authenticateToken,
}