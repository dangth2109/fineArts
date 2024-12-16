const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /api/competitions:
 *   post:
 *     summary: Create a new competition
 *     tags: [Competitions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: Competition created successfully
 * 
 *   get:
 *     summary: Get all competitions
 *     tags: [Competitions]
 *     responses:
 *       200:
 *         description: List of competitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 * 
 * /api/competitions/{id}:
 *   get:
 *     summary: Get competition by ID
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Competition details
 *       404:
 *         description: Competition not found
 */

router.post('/', 
  auth, 
  roleCheck(['staff', 'admin']), 
  competitionController.createCompetition
);

router.get('/', competitionController.getCompetitions);
router.get('/:id', competitionController.getCompetitionById);

router.put('/:id', 
  auth, 
  roleCheck(['staff', 'admin']), 
  competitionController.updateCompetition
);

router.delete('/:id', 
  auth, 
  roleCheck(['staff', 'admin']), 
  competitionController.deleteCompetition
);

module.exports = router;