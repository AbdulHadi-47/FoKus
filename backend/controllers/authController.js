const User = require("./models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
        try {
    const user = await User.findOne({ username: req.body.username})
    
    if (!user) return res.status(404).json({error: "username not found"});

    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) return res.status(401).json({error: "Invalid Password"});

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h'})

    res.cookie("token", token, {
        httpOnly: true,
         sameSite: "lax",
          secure: false
        })

    return   res.status(200).json(
        {
            message: "Login Successful"
        }
    )

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
module.exports = { loginUser } 