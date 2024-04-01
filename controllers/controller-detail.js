//const { db } = require("../config/cnn");
const axios = require('axios');


/*List Entry and Exit*/
const listEntryExit = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await axios.get(`http://localhost:8082/api/${userId}/user`);
        const listEntryExit = response.data; 
    res.json(listEntryExit)
    } catch (error) {
        res.status(500).send('Error retrieving detail for user');
    }
}

module.exports ={
    listEntryExit
}


