const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/submissions:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - competition
 *               - image
 *             properties:
 *               competition:
 *                 type: string
 *                 description: Competition ID
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Submission created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: List of all submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 * 
 * /api/submissions/{id}/evaluate:
 *   put:
 *     summary: Evaluate a submission
 *     tags: [Submissions] 
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
 *             required:
 *               - grade
 *             properties:
 *               grade:
 *                 type: string
 *                 enum: [best, better, good, moderate, normal, disqualified]
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Submission evaluated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff/Admin only
 *       404:
 *         description: Submission not found
 */

router.post('/',
  auth,
  upload.single('image'),
  submissionController.createSubmission
);

router.get('/', submissionController.getSubmissions);

router.put('/:id/evaluate',
  auth,
  roleCheck(['staff', 'admin']),
  submissionController.evaluateSubmission
);

module.exports = router;