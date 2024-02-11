const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// router.get('/test', auth,(req, res) => {
//     // res.send('Task Route API called')
//     res.json({
//         message:'task route API called',
//         user: req.user
//     })
// });

router.post('/create' , auth , async (req, res)=> {
    try{
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json({task, message: "Task created Successfully"});
    }
    catch(err){
        res.status(400).send({ error: err});
    }
})

router.get('/getTask', auth, async (req, res) => {
   try{
    const task = await Task.find({
        owner: req.user._id
    })
    res.status(200).json({task,count:task.length, message:"tasks fetched successfully"})
   }
   catch(err){
    res.status(500).send({ error: err});
   }
});


router.get('/:id', auth, async (req, res) => {
    
    const taskid=req.params.id;
    
    try{
     const task = await Task.findOne({
        _id:taskid, 
        owner: req.user._id
     });
     if(!task){
        return res.status(404).json({message:"Task not found"})
     }
     res.status(200).json({task,count:task.length, message:"tasks fetched successfully"})
    }
    catch(err){
     res.status(500).send({ error: err});
    }
 });

 router.patch('/:id', auth, async (req, res) => {
    
    const taskid=req.params.id;
    const updates= Object.keys(req.body);
    const allowedupdates=['description','completed'];
    const isValidOperation=updates.every(update=>allowedupdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error:"Invalid Updates"});
    }
    
    try{
     const task = await Task.findOne({
        _id:taskid, 
        owner: req.user._id
     });
     if(!task){
        return res.status(404).json({message:"Task not found"})
     }
    updates.forEach(update=> task[update]=req.body[update]);
    await task.save();

    res.json({message:"task updated successfully"})
    }
    catch(err){
     res.status(500).send({ error: err});
    }
 }); 

 router.delete('/:id', auth, async (req, res) => {
    
    const taskid=req.params.id;
    
    try{
     const task = await Task.findOneAndDelete({
        _id:taskid, 
        owner: req.user._id
     });
     if(!task){
        return res.status(404).json({message:"Task not found"})
     }
     res.status(200).json({task,count:task.length, message:"tasks deleted successfully"})
    }
    catch(err){
     res.status(500).send({ error: err});
    }
 });
 
module.exports = router;