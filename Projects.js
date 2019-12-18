const express=require('express');
const db=require('./data/helpers/projectModel');
const router = express.Router();


router.get('/', (req, res) => {
    db.get()
    
     .then(projects => {
        res.status(200).json(projects)
          }
     )
    .catch(err => {
        res.status(500).json({
          message: 'Server error- Could not retrieve projects.',
          err
        })
      })
     })

    router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)

    .then(project => {
        if(!id)
            res.status(404).json({
            message: "Could not find project with this ID."
        })
        else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Server error- Could not retrieve project.',
            err
        })
        })
        })
      
  

router.post('/:id', (req, res) => {
    const project = req.body;
    db.insert(project)

    .then(added => {
      if (!name || !description) {
        res.status(404).json({
          message: "Please include name and description"
        })
      } else {
    res.status(201).json(added)
      }
    })
    .catch(err => {
    res.status(500).json({
        message: 'Server error- Could not add project at this time.',
        err
    })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {name, description} = req.body;

    if(!id || !name || !description){
        res.status(400).json({
          error: "Please include ID, name, and description"
        })
      }
      
      else {
        db.update(req.params.id, req.body)
        .then(project => 
          {
            if(project){
              res.status(200).json(project)
            } else {
              res.status(404).json({
                message: "The project with this ID does not exist."
                })
            }
    })   
    .catch(err => {
          res.status(500).json({
            message: 'Server error- Could not update project at this time.', 
            err
      })
    })
  }})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)

    .then(deleted => {
        if(deleted)
        res.status(204).json({
        message: 'Project was deleted.'
        })
        else{
        res.status(404).json({
            message: 'Please select a project with a valid ID.'
        })
        }
    })
    .catch(err => {
        res.status(500).json({
        message: 'Server error- Could not delete project at this time.',
        err
        })
    })
    })

    module.exports= router;