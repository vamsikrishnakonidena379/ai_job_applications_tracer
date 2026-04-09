const bcrypt= require("bcrypt");
const pool=require("../config/db");
const {signToken}=require("../utils/jwt");

exports.register= async(req, res)=>{
    const {email, password}=req.body;
    const hash= await bcrypt.hash(password,10);

    const result= await pool.query(
        "insert into users(email, password) values($1,$2) returning id",
        [email, hash]
    );
    res.json({token: signToken({id:result.rows[0].id,email})});
}

exports.login= async(req,res)=>{
    const {email, password}=req.body;
    const result= await pool.query(
        "select * from users where email=$1",
        [email]
    );
    if(result.rows.length==0){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const user=result.rows[0];
    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }
    res.json({token: signToken({id:user.id,email})});
}