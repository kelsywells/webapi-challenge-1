const express= require('express')
const db=require('./data/helpers/actionModel')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
     .then(actions => {
            res.status(200).json(actions)
          }
     )
    .catch(err => {
        res.status(500).json({
          message: 'Server error- Could not retrieve actions.',
          err
        })
    })
  })

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get( id )

     .then(action => {
       if (!id) 
       res.status(404).json({
         message: "Could not find action with this ID."
       })
       else {
            res.status(200).json(action)
          }
     })
    .catch(err => {
        res.status(500).json({
          message: 'Server error- Could not retrieve action.',
          err
        })
    })
  })

  
router.post('/:id', (req, res) => {
    const newAction, { project_id, description, notes } = req.body;

    console.log(newAction);

    db.insert(newAction)
  
    .then(added => {
      if (!project_id || !description || !notes) {
        res.status(404).json({
          message: "Please include project_id, description, and notes"
        })
      } else {
      res.status(201).json(added)
      }
    })
  
    .catch(err => {
      res.status(500).json({
        message: 'Server error- Could not add action at this time.',
        err
      })
    })
  });

  
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    
    if(!id || !project_id || !description || !notes){
        res.status(400).json({
          error: "Please include ID, project_id, description, and notes "
        })
      }
      
      else {
        db.update(req.params.id, req.body)
        .then(action => 
          {
            if(action){
              res.status(200).json(action)
            } else {
              res.status(404).json({
                message: "The action with this ID does not exist."
                })
            }
    })   
    .catch(err => {
          res.status(500).json({
            message: 'Server error- Could not update action at this time.', 
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
        message: 'Deleted action.'
      })
      else{
        res.status(404).json({
          message: 'Invalid action ID.'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Server error- Could not delete action at this time.',
        err
      })
    })
  });

  module.exports= router;