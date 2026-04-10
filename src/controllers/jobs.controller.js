const pool=require("../config/db");

exports.createJob= async(req, res)=>{
    const {company, role, status, notes}=req.body;


     try{
    const result=await pool.query(
        "insert into jobs (user_id, company, role, status, notes) values ($1, $2, $3, $4, $5) returning * " ,
        [req.user.id, company, role, status, notes] 
    );

    if(result.rows.length===0){
        return res.status(400).json({message:"Failed to create job or unauthorized"})
    }
    res.status(201).json(`Job created succesfully with details: ${JSON.stringify(result.rows[0])}`);
}catch(err){
    console.error(err);
    res.status(500).json({messgae:"Server error"});
}



}
