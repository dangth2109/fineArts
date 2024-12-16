const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 * 
 * /api/users/students:
 *   get:
 *     summary: Get all students
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 * 
 * /api/users/staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members
 * 
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */

router.get('/',
  auth,
  roleCheck(['admin', 'manager']),
  userController.getAllUsers
);

router.get('/students',
  auth,
  roleCheck(['staff', 'admin', 'manager']),
  userController.getStudents
);

router.get('/staff',
  auth,
  roleCheck(['admin', 'manager']),
  userController.getStaff
);

router.get('/:id',
  auth,
  userController.getUserById
);

router.put('/:id',
  auth,
  roleCheck(['admin']),
  userController.updateUser
);

router.delete('/:id',
  auth,
  roleCheck(['admin']),
  userController.deleteUser
);

module.exports = router;