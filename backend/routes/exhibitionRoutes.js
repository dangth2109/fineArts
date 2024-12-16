const express = require('express');
const router = express.Router();
const exhibitionController = require('../controllers/exhibitionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /api/exhibitions:
 *   post:
 *     summary: Create a new exhibition
 *     tags: [Exhibitions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exhibition created successfully
 * 
 * /api/exhibitions/{id}/submissions:
 *   post:
 *     summary: Add submission to exhibition
 *     tags: [Exhibitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               submissionId:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Submission added to exhibition
 */

router.post('/',
  auth,
  roleCheck(['staff', 'admin']),
  exhibitionController.createExhibition
);

router.get('/', exhibitionController.getExhibitions);
router.get('/:id', exhibitionController.getExhibitionById);

router.put('/:id',
  auth,
  roleCheck(['staff', 'admin']),
  exhibitionController.updateExhibition
);

router.delete('/:id',
  auth,
  roleCheck(['staff', 'admin']),
  exhibitionController.deleteExhibition
);

router.post('/:id/submissions',
  auth,
  roleCheck(['staff', 'admin']),
  exhibitionController.addSubmissionToExhibition
);

router.put('/:exhibitionId/submissions/:submissionId',
  auth,
  roleCheck(['staff', 'admin']),
  exhibitionController.updateSubmissionStatus
);

module.exports = router;