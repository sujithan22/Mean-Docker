// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const employeeSchema = new mongoose.Schema({
  name: String,
  id:Number,
  location: String,
  pickup:Boolean,
  drop:Boolean
});

// create mongoose model
const Employee = mongoose.model('Employee', employeeSchema);

/* GET api listing. */
router.get('/', (req, res) => {
		res.send('api works');
});

/* GET all users. */
router.get('/employees', (req, res) => {
	Employee.find({}, (err, users) => {
		if (err) res.status(500).send(error)

		res.status(200).json(users);
	});
});

/* GET one users. */
router.get('/employees/:id', (req, res) => {
	Employee.find({id:req.params.id}, (err, users) => {
		if (err) res.status(500).send(err)

		res.status(200).json(users);
	});
});

/* Create a user. */
router.post('/employee', (req, res) => {
	let employee = new Employee({
		name: req.body.name,
		id: req.body.id,
		location: req.body.location,
		pickup:req.body.pickup,
		drop:req.body.drop,
	});

	employee.save(error => {
		if (error) res.status(500).send(error);

		res.status(201).json({
			message: 'User created successfully'
		});
	});
});

// delete a todo
  router.delete('/employees/:id', function(req, res) {
  		console.log("in Deletion"+ req.params.id);
      Employee.remove({
          id : req.params.id
      }, function(err, todo) {
          if (err)
              res.send(err);

          // get and return all the todos after you create another
          Employee.find({}, (err, users) => {
						if (err) res.status(500).send(err)

						res.status(200).json(users);
					});
      });
  });

  // Update a todo
  router.put('/employee/:id', function(req, res) {
      Employee.find({
          id : req.params.id
      }, function(err, employee) {
          if (err)
              res.send(err);
          

          Employee.update({
          id : req.params.id
      }, {name : req.body.name,
					id : req.body.id,
					location : req.body.location,
					pickup : req.body.pickup,
					drop : req.body.drop},(error)=> {
						if (error) res.status(500).send(error);

						 Employee.find({}, (err, users) => {
							if (err) res.status(500).send(err)

							res.status(200).json(users);
						});
					});
      });
  });

module.exports = router;
