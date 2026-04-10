const express= require("express");
const router= express.Router();
const auth=require("../middleware/auth.middleware");

router.use(auth);

module.exports=router;