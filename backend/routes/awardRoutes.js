const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /api/awards:
 *   post:
 *     summary: Create a new award
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition:
 *                 type: string
 *               submission:
 *                 type: string
 *               student:
 *                 type: string
 *               rank:
 *                 type: string
 *               prize:
 *                 type: string
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Award created successfully
 * 
 *   get:
 *     summary: Get all awards
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of awards
 */

router.post('/',
  auth,
  roleCheck(['staff', 'admin']),
  awardController.createAward
);

router.get('/', awardController.getAwards);
router.get('/:id', awardController.getAwardById);

router.put('/:id',
  auth,
  roleCheck(['staff', 'admin']),
  awardController.updateAward
);

router.delete('/:id',
  auth,
  roleCheck(['staff', 'admin']),
  awardController.deleteAward
);

module.exports = router;