const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/auth.routes");
const jobRoutes=require("./routes/jobs.routes");
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);

app.get("/health",(req,res)=>{
    res.json({status:"ok, server is healthy"});
});

module.exports=app;