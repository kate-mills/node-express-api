const asyncWrapper = require('../middleware/async')
const Task = require('../models/Task')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res)=>{
    const tasks = await Task.find({}) 
    return res.status(200).json({tasks})
    //return res.status(500).json({msg: error})
})

const createTask = asyncWrapper(async (req, res)=>{
    const task = await Task.create(req.body)
    return res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res,next)=>{
    const {id: taskID} = req.params
    const task = await Task.findOne({ _id: taskID})
    if(!task){
      // id has propper syntax eg: correct length but not in db
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
    //res.status(500).json({msg: error})
})

const updateTask = asyncWrapper(async (req, res)=>{
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate(
      {_id: taskID},
      req.body,
      {new: true, runValidators: true}
    )
    if(!task){
      // id has propper syntax eg: correct length but not in db
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res)=>{
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if(!task){
      // id has propper syntax eg: correct length but not in db
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
