const express = require('express');
const Student = require('../database/student'); // Import the Student model
const router = express.Router();

// POST /students - Create a New Student
router.post('/', async (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).send('Missing required fields: name, age, and email');
  }

  try {
    const student = new Student({ name, age, email });
    await student.save();
    res.status(201).send({ student_id: student._id });
  } catch (error) {
    res.status(500).send('Error creating student: ' + error.message);
  }
});

// GET /students - Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      return res.status(404).send('No students found');
    }
    const response = students.map(student => ({
      student_id: student._id,
      name: student.name,
      age: student.age,
      email: student.email
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send('Error retrieving students: ' + error.message);
  }
});

// GET /students/:id - Get a Student by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json({
      student_id: student._id,
      name: student.name,
      age: student.age,
      email: student.email
    });
  } catch (error) {
    res.status(500).send('Error retrieving student: ' + error.message);
  }
});

// PUT /students/:id - Update Student Information
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true }  // Return the updated student document
    );

    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student_id: student._id,
      name: student.name,
      age: student.age,
      email: student.email
    });
  } catch (error) {
    res.status(500).send('Error updating student: ' + error.message);
  }
});

// DELETE /students/:id - Delete a Student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting student: ' + error.message);
  }
});

module.exports = router;
