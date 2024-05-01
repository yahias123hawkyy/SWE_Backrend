const { signUp, signIn, getUserById } = require('../services/auth_service');

async function postSignUp(req, res) {
  try {
    const [token,userId] = await signUp(req.body);
    res.status(201).json( {token:token,userId:userId} );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getUserData = async (req, res) => {
    try {
      const userId = req.params.id; 
      console.log("id recieved");
      console.log(userId);
      const user = await getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

async function postSignIn(req, res) {
  try {
    const { username, password } = req.body;
    const [token, userId] = await signIn(username, password);
    res.json({token:token,userId: userId});
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = { postSignUp, postSignIn,getUserData  };
