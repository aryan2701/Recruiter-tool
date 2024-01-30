const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp({
  connectionString: 'postgres://recruiterdb:7AcAJ8Bd3VRcespXV72XadoSyonniJtN@dpg-cmsk7m8l5elc738rjqb0-a.oregon-postgres.render.com/recruiterdb_1lp4',
  ssl: {
    rejectUnauthorized: false, // This option is required if your PostgreSQL server is using self-signed certificates
  },
});


// Function to map experience options to integer values
const mapExperienceToInteger = (experience) => {
  switch (experience) {
    case 'Less than 1 year':
      return 1;
    case '1-2 years':
      return 2;
    default:
      return 3;
  }
};

router.get('/', async (req, res, next) => {
  try {
    const candidates = await db.any(`
      SELECT *, 
        (CASE 
          WHEN nodejs_experience <= 1 THEN 'Less than 1 year' 
          WHEN nodejs_experience > 1 AND nodejs_experience <= 2 THEN '1-2 years' 
          ELSE 'Over 2 years' 
        END) AS nodejs_experience, 
        (CASE 
          WHEN reactjs_experience <= 1 THEN 'Less than 1 year' 
          WHEN reactjs_experience > 1 AND reactjs_experience <= 2 THEN '1-2 years' 
          ELSE 'Over 2 years' 
        END) AS reactjs_experience, 
        (CASE 
          WHEN nodejs_experience <= 1 THEN 1 
          WHEN nodejs_experience > 1 AND nodejs_experience <= 2 THEN 2 
          ELSE 3 
        END) AS nodejs_score, 
        (CASE 
          WHEN reactjs_experience <= 1 THEN 1 
          WHEN reactjs_experience > 1 AND reactjs_experience <= 2 THEN 2 
          ELSE 3 
        END) AS reactjs_score, 
        ((CASE 
          WHEN nodejs_experience <= 1 THEN 1 
          WHEN nodejs_experience > 1 AND nodejs_experience <= 2 THEN 2 
          ELSE 3 
        END) + 
        (CASE 
          WHEN reactjs_experience <= 1 THEN 1 
          WHEN reactjs_experience > 1 AND reactjs_experience <= 2 THEN 2 
          ELSE 3 
        END)) AS total_score 
      FROM candidates
    `);
    res.json(candidates);
  } catch (error) {
    next(error);
  }
});



router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, skills, status, expected_salary, reactjs_experience, nodejs_experience } = req.body;
    const newCandidate = await db.one(
      'INSERT INTO candidates (name, email, phone, skills, status, expected_salary, reactjs_experience, nodejs_experience) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, email, phone, skills, status, expected_salary, mapExperienceToInteger(reactjs_experience), mapExperienceToInteger(nodejs_experience)]
    );
    res.status(201).json(newCandidate);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedCandidate = await db.oneOrNone(
      'UPDATE candidates SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (updatedCandidate) {
      res.json(updatedCandidate);
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCandidate = await db.result('DELETE FROM candidates WHERE id = $1', id);
    if (deletedCandidate.rowCount === 1) {
      res.json({ message: 'Candidate deleted successfully' });
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
