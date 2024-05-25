const pool = require("../../db");
const queries = require("./queries");
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const { id } = req.params;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailexists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      return res.status(400).send("Email already exists");
    }
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("student created successfully");
      }
    );
  });
};
const removeStudent = (req, res) => {
  const { id } = req.params;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("student does not exists");
    }
    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("student removed succesfully");
    });
  });
};
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("student does not exists");
    }
    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("student updated succesfully");
    });
  });
};
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
