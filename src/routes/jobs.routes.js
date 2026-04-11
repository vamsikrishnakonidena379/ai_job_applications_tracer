const express= require("express");
const router= express.Router();
const pool=require("../config/db");
const auth=require("../middleware/auth.middleware");
const {createJob}=require("../controllers/jobs.controller");


router.use(auth);
router.post("/",createJob);
router.put("/:id",async (req, res)=>{
    const jobId=req.params.id;
    const userId=req.user.id;
    const {company, role, status, notes}= req.body;
    status=status.toLowerCase();

    try{
        const result= await pool.query(
            "update jobs set company=$1, role=$2, status=$3, notes=$4 where id=$5 and user_id=$6 returning *",
            [company, role, status, notes, jobId, userId]   
        )

    if(result.rows.length===0)
    {
       return res.status(404).json({message: "Job not found"});
    }
    res.json(`Job updated successfully with details: ${JSON.stringify(result.rows[0])}`);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }

});

router.delete("/:id", async(req, res)=>{
    const jobId=req.params.id;
    const userId=req.user.id;

    try{
        const result= await pool.query(
            "delete from jobs where id=$1 and user_id=$2 returning *",
            [jobId, userId]
        )
        if(result.rows.length===0){
            return res.status(404).json({message: "unable to delete"});
        }
        res.status(200).json({message: `Job deleted successfully with details: ${JSON.stringify(result.rows[0])}`});
    }catch(err){
        console.error(err);
        res.status(500).json({message:" Server error"});
    }

});


router.get("/", async(req,res)=>{
    const userId=req.user.id;
    const {status}=req.query;
    const normalizedStatus=status? status.toLowerCase():status;

    let query="select * from jobs where user_id=$1";
    let values=[userId];

    if(status){
        query+=" and status=$2";
        values.push(normalizedStatus);
    }

    try{
        const result= await pool.query(
            query,values
        );
        res.json(result.rows)
    }catch(err)
    {
        console.error(err);
        res.status(500).json({message:" Server error"});
    }
})

module.exports=router;