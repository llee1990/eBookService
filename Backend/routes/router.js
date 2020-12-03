/**
 * @swagger
 *
 * components:
 *  schemas:
 *   Create User:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - password
 *       - password_repeat
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       password_repeat:
 *         type: string
 *         format: password
 *   Login User:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   eBook:
 *     type: object
 *     required:
 *       - title
 *       - author
 *       - genre
 *       - year
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       genre:
 *         type: string
 *       year:
 *         type: integer
 *         format: year
 *       content:
 *         type: string
 */

const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/users.middleware.js');
const authController = require("../controllers/auth.controller.js");
const usersController = require("../controllers/users.controller.js");

/**
 * @swagger
 * /api/eBooks:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks", userMiddleware.isLoggedIn, usersController.getAllBooks);

/**
 * @swagger
 * /api/eBooks/title/{title}:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that matches the title
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: title
 *         description: Title of book you want to search for
 *         in: path
 *         required: true
 *         type: String
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that matches the title in parameter
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/title/:title", userMiddleware.isLoggedIn, usersController.getBooksByTitle);

/**
 * @swagger
 * /api/eBooks/author/{author}:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that matches the author
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: author
 *         description: author of book you want to search for
 *         in: path
 *         required: true
 *         type: String
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that matches the author in parameter
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/author/:author", userMiddleware.isLoggedIn, usersController.getBooksByAuthor);

/**
 * @swagger
 * /api/eBooks/genre/{genre}:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that matches the genre
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: genre
 *         description: genre of book you want to search for
 *         in: path
 *         required: true
 *         type: String
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that matches the genre in parameter
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/genre/:genre", userMiddleware.isLoggedIn, usersController.getBooksByGenre);

/**
 * @swagger
 * /api/eBooks/year/{year}:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that matches the year
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: year
 *         description: year of book you want to search for
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that matches the year in parameter
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/year/:year", userMiddleware.isLoggedIn, usersController.getBooksByYear);

/**
 * @swagger
 * /api/eBooks/uploader/{uploader}:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that was uploaded by the queried user
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: uploader
 *         description: Username of an user you want to search for
 *         in: path
 *         required: true
 *         type: String
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that was uploaded by a specific user
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/uploader/:uploader", userMiddleware.isLoggedIn, usersController.getBooksByUser);

/**
 * @swagger
 * /api/eBooks/youruploads:
 *   get:
 *     tags: ["eBooks"]
 *     description: Returns all eBooks from MySQL DB that was uploaded by you. This route parses your userID that is encrypted in the access token and uses it to query the DB.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *        - application/json
 *     responses:
 *       200:
 *         description: Returns an array of all eBooks in the DB that was uploaded by you. 
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eBook'
 *       400:
 *         description: DB query failed
 *       401:
 *         description: Unauthorized access
 */
router.get("/ebooks/youruploads", userMiddleware.isLoggedIn, usersController.getBooksYouUploaded);

/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags: ["User"]
 *     description: Creates a new user
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing user info, enter password twice to confirm. Password must be at
 *                    least 8 characters long
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Create User'
 *     responses:
 *       200:
 *         description: Success message if user is created successfully.
 *         schema:
 *           type: string
 *       400:
 *         description: Registration validation errors
 *       409:
 *         description: Username or Email is already in use by another user
 *       500:
 *         description: Password error
 */
router.post('/signup', userMiddleware.validateRegister, authController.signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: ["User"]
 *     description: Signs in a user
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing username and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login User'
 *     responses:
 *       200:
 *         description: Login successful. Returns object containing access token and user information
 *         schema:
 *           type: object
 *       400:
 *         description: User does not exist
 *       401:
 *         description: Username or password is incorrect
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/add/ebook:
 *   post:
 *     tags: ["eBooks"]
 *     description: Adds an eBook to the DB
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing eBook information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/eBook'
 *     responses:
 *       200:
 *         description: eBook uploaded successfully
 *         schema:
 *           type: string
 *       400:
 *         description: Required fields were not filled in correctly
 *       409:
 *         description: Duplicate eBook in DB
 */
router.post('/add/ebook', userMiddleware.isLoggedIn, usersController.addEbook);

/**
 * @swagger
 * /api/edit/user:
 *   put:
 *     tags: ["User"]
 *     description: Edits user account information
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing new user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *               newPassword:
 *                 type: string
 *                 format: password
 *               newUsername:
 *                 type: string
 *               newEmail:
 *                 type: string
 *           example:   # Sample object
 *               oldPassword: "11111111"
 *               newPassword: "22222222"
 *               newUsername: newAccountName
 *               newEmail: newemail@gmail.com
 *     responses:
 *       200:
 *         description: user information editted successfully
 *         schema:
 *           type: string
 *       400:
 *         description: user modification errors
 *       401:
 *         description: Password verification failed
 */
router.put("/edit/user", userMiddleware.isLoggedIn, usersController.editUser);

/**
 * @swagger
 * /api/edit/ebook:
 *   put:
 *     tags: ["eBooks"]
 *     description: Edits eBook information except for contents
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing new eBook information
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               bookID:
 *                 type: integer
 *               password:
 *                 type: string
 *                 format: password
 *               newTitle:
 *                 type: string
 *               newAuthor:
 *                 type: string
 *               newGenre:
 *                 type: string
 *               newYear:
 *                 type: string
 *           example:   # Sample object
 *               id: 5
 *               password: "11111111"
 *               newTitle: Edited Title
 *               newAuthor: Leon Lee
 *               newGenre: Non-fiction
 *               newYear: 1800
 *     responses:
 *       200:
 *         description: eBook information editted successfully
 *         schema:
 *           type: string
 *       400:
 *         description: eBook modification errors
 *       401:
 *         description: Password verification failed
 */
router.put("/edit/ebook", userMiddleware.isLoggedIn, usersController.editEbook);

/**
 * @swagger
 * /api/delete/ebook:
 *   delete:
 *     tags: ["eBooks"]
 *     description: Removes an eBook from DB. The eBook must be uploaded by the current user.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Object containing eBook information
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *           example:   # Sample object
 *               title: "ENTER TITLE HERE"
 *               author: "ENTER AUTHOR HERE"
 *     responses:
 *       200:
 *         description: eBook deleted successfully
 *         schema:
 *           type: string
 *       400:
 *         description: eBook deletion errors
 */
router.delete("/delete/ebook", userMiddleware.isLoggedIn, usersController.deleteEbook);

/**
 * @swagger
 * /api/delete/user:
 *   delete:
 *     tags: ["User"]
 *     description: Deletes the current user using access token as verification and user identification
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user deleted successfully
 *         schema:
 *           type: string
 *       400:
 *         description: user deletion errors
 */
router.delete("/delete/user", userMiddleware.isLoggedIn, usersController.deleteUser);

module.exports = router;