const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios');
const port = 3000;

const mariadb = require('mariadb');
const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sample',
        port: 3306,
        connectionLimit: 5
});

const options = {
        swaggerDefinition: {
info: {
title: 'Rest-like API',
version: '1.0.0',
description: 'Basic Rest-like API for simple database'
},
host: 'localhost:3000',
basePath: '/',
},
apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(cors());

const validateCustomers = [
body('CUST_CODE').notEmpty().withMessage("Customer Code is required"),
        body('CUST_CODE').isString().isLength({min: 6, max: 6}).withMessage("Customer Code must be a string of length 6"),
        body('CUST_NAME').trim().isString().withMessage("Customer Name must be a string"),
        body('CUST_CITY').trim().isString().withMessage("Customer City must be a string"),
        body('WORKING_AREA').trim().isString().withMessage("Working Area must be a string"),
        body('CUST_COUNTRY').trim().isString().withMessage("Customer Country must be a string"),
        body('GRADE').isFloat().withMessage("Customer Country must be a string"),
        body('OPENING_AMT').isFloat().withMessage("Opening Amount must be a float"),
        body('RECEIVE_AMT').isFloat().withMessage("Receive Amount must be a float"),
        body('PAYMENT_AMT').isFloat().withMessage("Payment Amount must be a float"),
        body('OUTSTANDING_AMT').isFloat().withMessage("Outstanding Amount must be a float"),
        body('PHONE_NO').isString().withMessage("Customer Country must be a float"),
        body('AGENT_CODE').isString().isLength({min: 4, max: 4}).withMessage("Agent Code must be a string of length 4")
];

const validateCustomers2 = [

        body('CUST_NAME').trim().isString().withMessage("Customer Name must be a string"),
        body('CUST_CITY').trim().isString().withMessage("Customer City must be a string"),
        body('WORKING_AREA').trim().isString().withMessage("Working Area must be a string"),
        body('CUST_COUNTRY').trim().isString().withMessage("Customer Country must be a string"),
        body('GRADE').isFloat().withMessage("Customer Country must be a string"),
        body('OPENING_AMT').isFloat().withMessage("Opening Amount must be a float"),
        body('RECEIVE_AMT').isFloat().withMessage("Receive Amount must be a float"),
        body('PAYMENT_AMT').isFloat().withMessage("Payment Amount must be a float"),
        body('OUTSTANDING_AMT').isFloat().withMessage("Outstanding Amount must be a float"),
        body('PHONE_NO').isString().withMessage("Customer Country must be a float"),
        body('AGENT_CODE').isString().isLength({min: 4, max: 4}).withMessage("Agent Code must be a string of length 4")
];

/**
 * @swagger
 * /customers:
 *    get:
 *      description: Return all customers
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object customers containing array of all customers
 *          500:
 *              description: Internal server error
 */

app.get('/customers', async (req, res) => {
        try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM customer');
    conn.release();

    res.json(rows).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})


/**
 * @swagger
 * /customers/{id}:
 *    get:
 *      description: Return customer with the chosen id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object customers containing array of customers with id
 *          500:
 *              description: Internal server error
 */
app.get('/customers/:id', async (req, res) => {
        try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM customer WHERE CUST_CODE=\'' + req.params.id + '\'');
    conn.release();

    res.json(rows).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /customers:
 *    post:
 *      description: Insert a new customer into the database
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              content:
 *                  - application/json
 *          500:
 *              description: Internal server error
 */
app.post('/customers', validateCustomers, async (req, res) => {
        try {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


    var {CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE } = req.body


        CUST_CODE = req.sanitize(CUST_CODE);
        CUST_NAME = req.sanitize(CUST_NAME);
        CUST_CITY = req.sanitize(CUST_CITY);
        WORKING_AREA = req.sanitize(WORKING_AREA);
        CUST_COUNTRY = req.sanitize(CUST_COUNTRY);
        GRADE = req.sanitize(GRADE);
        OPENING_AMT = req.sanitize(OPENING_AMT);
        RECEIVE_AMT = req.sanitize(RECEIVE_AMT);
        PAYMENT_AMT = req.sanitize(PAYMENT_AMT);
        OUTSTANDING_AMT = req.sanitize(OUTSTANDING_AMT);
        PHONE_NO = req.sanitize(PHONE_NO);
        AGENT_CODE = req.sanitize(AGENT_CODE);

    const conn = await pool.getConnection();
    const rows = await conn.query('INSERT INTO customer (CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE)  values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE]);
    conn.release();


    res.json({CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /customers/{id}:
 *    put:
 *      description: Update a customer matching the id in the database
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              content:
 *                  - application/json
 *          500:
 *              description: Internal server error
 */
app.put('/customers/:id', validateCustomers2, async (req, res) => {
        try {

var CUST_CODE = req.params.id;
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


    var {CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE } = req.body

        CUST_CODE = req.sanitize(CUST_CODE);
        CUST_NAME = req.sanitize(CUST_NAME);
        CUST_CITY = req.sanitize(CUST_CITY);
        WORKING_AREA = req.sanitize(WORKING_AREA);
        CUST_COUNTRY = req.sanitize(CUST_COUNTRY);
        GRADE = req.sanitize(GRADE);
        OPENING_AMT = req.sanitize(OPENING_AMT);
        RECEIVE_AMT = req.sanitize(RECEIVE_AMT);
        PAYMENT_AMT = req.sanitize(PAYMENT_AMT);
        OUTSTANDING_AMT = req.sanitize(OUTSTANDING_AMT);
        PHONE_NO = req.sanitize(PHONE_NO);
        AGENT_CODE = req.sanitize(AGENT_CODE);

    const conn = await pool.getConnection();
    const rows = await conn.query('UPDATE customer SET CUST_CODE = ?, CUST_NAME = ?, CUST_CITY = ?, WORKING_AREA = ?, CUST_COUNTRY = ?, GRADE = ?, OPENING_AMT = ?, RECEIVE_AMT = ?, PAYMENT_AMT = ?, OUTSTANDING_AMT = ?, PHONE_NO = ?, AGENT_CODE = ? WHERE CUST_CODE = ?',[CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE, CUST_CODE]);
    conn.release();

 if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }


    res.json({CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /customers/{id}:
 *    patch:
 *      description: Update specific fields for the customer matching the id in the database
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Sucessful operation
 *              content:
 *                  - application/json
 *          500:
 *              description: Internal server error
 */
app.patch('/customers/:id', async (req, res) => {
        try {

var CUST_CODE = req.params.id;

    var {CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE } = req.body

        CUST_CODE = req.sanitize(CUST_CODE);
        CUST_NAME = req.sanitize(CUST_NAME);
        CUST_CITY = req.sanitize(CUST_CITY);
        WORKING_AREA = req.sanitize(WORKING_AREA);
        CUST_COUNTRY = req.sanitize(CUST_COUNTRY);
        GRADE = req.sanitize(GRADE);
        OPENING_AMT = req.sanitize(OPENING_AMT);
        RECEIVE_AMT = req.sanitize(RECEIVE_AMT);
        PAYMENT_AMT = req.sanitize(PAYMENT_AMT);
        OUTSTANDING_AMT = req.sanitize(OUTSTANDING_AMT);
        PHONE_NO = req.sanitize(PHONE_NO);
        AGENT_CODE = req.sanitize(AGENT_CODE);

    const conn = await pool.getConnection();
var rows;

        if(CUST_NAME){
        rows = await conn.query('UPDATE customer SET CUST_NAME = ? WHERE CUST_CODE = ?', [CUST_NAME, CUST_CODE])
}
if( CUST_CITY){
        rows = await conn.query('UPDATE customer SET  CUST_CITY = ? WHERE CUST_CODE = ?', [ CUST_CITY, CUST_CODE])
}
if(WORKING_AREA){
        rows = await conn.query('UPDATE customer SET WORKING_AREA = ? WHERE CUST_CODE = ?', [WORKING_AREA, CUST_CODE])
}
if(CUST_COUNTRY){
        rows = await conn.query('UPDATE customer SET CUST_COUNTRY = ? WHERE CUST_CODE = ?', [CUST_COUNTRY, CUST_CODE])
}
if(GRADE){
        rows = await conn.query('UPDATE customer SET GRADE = ? WHERE CUST_CODE = ?', [GRADE, CUST_CODE])
}
if(OPENING_AMT){
        rows = await conn.query('UPDATE customer SET OPENING_AMT = ? WHERE CUST_CODE = ?', [OPENING_AMT, CUST_CODE])
}
if(RECEIVE_AMT){
        rows = await conn.query('UPDATE customer SET RECEIVE_AMT = ? WHERE CUST_CODE = ?', [RECEIVE_AMT, CUST_CODE])
}
if(PAYMENT_AMT){
        rows = await conn.query('UPDATE customer SET PAYMENT_AMT = ? WHERE CUST_CODE = ?', [PAYMENT_AMT, CUST_CODE])
}
if(OUTSTANDING_AMT){
        rows = await conn.query('UPDATE customer SET OUTSTANDING_AMT = ? WHERE CUST_CODE = ?', [OUTSTANDING_AMT, CUST_CODE])
}
if(PHONE_NO){
        rows = await conn.query('UPDATE customer SET (PHONE_NO = ? WHERE CUST_CODE = ?', [PHONE_NO, CUST_CODE])
}
if(AGENT_CODE){
        rows = await conn.query('UPDATE customer SET AGENT_CODE = ? WHERE CUST_CODE = ?', [AGENT_CODE, CUST_CODE])
}
    conn.release();

 if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }


    res.json({CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /customers/{id}:
 *    delete:
 *      description: Delete a customer from the database
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Sucessful operation
 *              content:
 *                  - application/json
 *          500:
 *              description: Internal server error
 */
app.delete('/customers/:id', async (req, res) => {
        try {

var CUST_CODE = req.params.id;

CUST_CODE = req.sanitize(CUST_CODE);


    const conn = await pool.getConnection();
    const rows = await conn.query('DELETE from customer WHERE CUST_CODE = ?', CUST_CODE);
    conn.release();

 if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }


    res.json(CUST_CODE).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /agents:
 *    get:
 *      description: Return all agents
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object agents containing array of all customers
 *          500:
 *              description: Internal server error
 */
app.get('/agents', async (req, res) => {
        try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM agents');
    conn.release();

    res.json(rows).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

/**
 * @swagger
 * /agents/{id}:
 *    get:
 *      description: Return agent with the chosen id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object agent containing array of agents with id
 *          500:
 *              description: Internal server error
 */
app.get('/agents/:id', async (req, res) => {
        try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM customer WHERE AGENT_CODE=\'' + req.params.id + '\'');
    conn.release();

    res.json(rows).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

app.get('/say', async (req, res) => {
  try {
    const response = await axios.get('https://nzgylnn60b.execute-api.us-east-2.amazonaws.com/default/say?=keyword' + req.query.keyword);
    res.json(response.data);
  } catch (error) {
    console.error('Error invoking Lambda function:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
        console.log('Example app listening at http://localhost:${port}')
});



