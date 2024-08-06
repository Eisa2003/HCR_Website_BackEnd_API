const asyncHandler = require("express-async-handler")
const Admin = require("../models/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc Register an admin
//@route POST /api/admin/register
//@access private
const registerAdmin = asyncHandler(
    async (req, res) => {
        const {adminName, email, password} = req.body;
        if(!adminName || !email || !password){
            res.status(400).json({message: "All fields are mandatory!"}); // client error
        }

        const adminAvailable = await Admin.findOne({email});
        if(adminAvailable){
            res.status(400).json({message: "Admin already registered!"});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password: ", hashedPassword);
        const admin = await Admin.create({ // add to the database
            adminName,
            email,
            password: hashedPassword
        })

        if(admin){ // returns a boolean value I think
            // console.log(`Admin created successfully: ${admin}`);
            // res.status(201).json({_id: admin.id, email: admin.email});
            res.status(201).json({message: "Admin Registered Successfully!"});
        }
        else{
            res.status(400).json({message: "User data is not valid"});
        }
        
        // res.json({ message: "Register the admin" });
    }
)

//@desc Login an admin
//@route POST /api/admin/login
//@access private
const loginAdmin = asyncHandler(
    async (req, res) => {
        const {email, password} = req.body; // destructure the body
        if(!email || !password){
            res.status(400).json({message: "All fields are mandatory!"});
            // throw new Error(""); // This was for the backend specifically
        } // end if

        const admin = await Admin.findOne({ email });

        // compare pass with hashed one
        if(admin && (await bcrypt.compare(password, admin.password))){ // the pass we entered, compared with the pass of the admin
            const accessToken = jwt.sign({ //payload
                admin: {
                    adminName: admin.adminName,
                    email: admin.email,
                    id: admin.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, // Signature
               { expiresIn: "55m" }
        );
            res.status(200).json({ accessToken });
        }
        else {
            res.status(401).json({ message: "email or password is not valid!" })
            // throw new Error("email or password is not valid!")
        } // end if/else

        // res.json({ message: "Login user" });
    }
)

//@desc current admin info
//@route GET /api/admin/current
//@access private
const currentAdmin = asyncHandler(
    async (req, res) => {
        res.json( req.admin );
    }
)

module.exports = { registerAdmin, loginAdmin, currentAdmin }