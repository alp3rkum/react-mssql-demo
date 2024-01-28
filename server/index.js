const express = require('express'); //The Express module
const sql = require("msnodesqlv8"); //The driver to bind with MS SQL Server
const crypto = require('crypto'); //the module for hashing algorithm, since the password is stored in its hashed form in the main database (for safety and demonstration purposes)

const app = express(); //creates the backend

app.use(express.json()); //Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allows CORS
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //Allows GET, POST, PUT, DELETE, OPTIONS HTTP requests
    next();
  });

const connectionString = "Driver={SQL Server Native Client 11.0};Server=(localdb)\\MSSQLLocalDB;Database=db_utrust_react;Trusted_Connection=Yes;"; //Connection string
const queries = [ //this array stores the main queries that is used by the backend
    "SELECT * from userData", //to get (and check login data)
    `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
    FROM products p
    JOIN product_categories pc ON p.product_category_ID = pc.id`, //template query for standard product table related queries
    'SELECT COUNT(*) FROM products', //query to get the count of the datas in the product table
];

app.get('/', (req, res) => {
    res.send('Hello! Welcome to the API.'); //a small, simple index page for the API
  });

app.get('/api/userData', (req, res) => { //gets user data (located in userData table)
    sql.query(connectionString, queries[0], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    });
});

app.get('/api/products', (req, res) => { //gets all products
    sql.query(connectionString, queries[1], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    });
});

app.get('/api/products/count', (req, res) => { //gets the count of the datas
    sql.query(connectionString, queries[2], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    })
})

app.get('/api/products/page=:page', (req, res) => { //paginates the datas by ten
    const { page } = req.params;
    const offset = (parseInt(page) - 1) * 10;
    const query = `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
    FROM products p JOIN product_categories pc ON p.product_category_ID = pc.id
    ORDER BY p.id OFFSET ${offset} ROWS FETCH NEXT 10 ROWS ONLY`;
    sql.query(connectionString, query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    });
});

app.get('/api/products/id=:id', (req,res) => { //gets a specific product according to its id in the database
    const { id } = req.params;
    const query = `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
    FROM products p JOIN product_categories pc ON p.product_category_ID = pc.id
    WHERE p.id = ${id}`;
    sql.query(connectionString, query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    });
});

app.get('/api/products/order=:order%20:desc/page=:page', (req,res) => { //sorts and paginates the datas
    const { order, desc, page } = req.params;
    const offset = (parseInt(page) - 1) * 10;
    const query = `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
    FROM products p JOIN product_categories pc ON p.product_category_ID = pc.id
    ORDER BY ${order} ${desc} OFFSET ${offset} ROWS FETCH NEXT 10 ROWS ONLY`;
    sql.query(connectionString, query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else
        {
            res.json(result);
        }
    })
})

// app.get('/api/products', (req, res) => { An unsuccessful implementation of the DataManager into the backend, turns out it wasn't needed at all😅
//     const { page, pageSize } = req.query;
//     const offset = (page - 1) * pageSize;
//     const query = `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
//     FROM products p
//     JOIN product_categories pc ON p.product_category_ID = pc.id
//     ORDER BY p.id OFFSET ${offset} ROWS FETCH NEXT 10 ROWS ONLY;`;
//     sql.query(connectionString, queries[2], (err, result) => {
//         if (err) {
//             console.error("An error occurred while executing the SQL query for /api/products:", err);
//             res.status(500).json({ error: "An unexpected error occurred while processing your request." });
//         }
//         else
//         {
//             res.json(result);
//         }
//     });
// });

// app.get('/api/products', (req, res) => {
//     const dataManager = new DataManager({
//       url: 'http://localhost:5000/api/productsData', // New route for data retrieval
//       adaptor: new WebApiAdaptor,
//     });
//     //console.log(req.query);
//     const query = new Query().addParams(req.query); // Pass query parameters from the request
//     console.log(query.params);
//     dataManager.executeQuery(query)
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((error) => {
//         res.status(500).json({ error: error.message });
//       });
//   });

//   app.get('/api/productsData', (req, res) => {
//     // console.log(req.query.page);
//     const page = req.query.page || 1; // Get the page number from the query parameters
//     const pageSize = req.query.pageSize || 10; // Get the page size from the query parameters
//     const sortField = req.query.sortField || 'id'; // Get the field to sort by from the query parameters
//     const sortOrder = req.query.sortOrder || 'asc'; // Get the sort order from the query parameters
//     const filter = req.query.filter || ''; // Get the filter criteria from the query parameters
  
//     // Build the SQL query based on the query parameters
//     const sqlQuery = `SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
//                         FROM products p
//                         JOIN product_categories pc ON p.product_category_ID = pc.id
//                         WHERE p.product_name LIKE '%${filter}%'
//                         ORDER BY ${sortField} ${sortOrder}
//                         OFFSET ${(page - 1) * pageSize} ROWS
//                         FETCH NEXT ${pageSize} ROWS ONLY`;
  
//     // Execute the SQL query to retrieve the data
//     sql.query(connectionString, sqlQuery, (err, result) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res.json(result);
//       }
//     });
//   });

/* User Login */
/**************/
app.post('/api/userLogin', (req, res) => { //the POST request of the section of the API that holds user data
    const {email, password} = req.body; //gets the email and password values from the login screen
    console.log(email);
    const query = "SELECT * from userData WHERE email = ?"; //searches for a user with the specified email
    const params = [email];
    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.log("Error!")
            res.status(500).json({ error: err.message });
        }
        else
        {
            //console.log(result);
            let user = JSON.stringify(result);
                user = JSON.parse(user);
                try
                {
                    console.log("Email found"); //if it finds the email
                    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex'); //hashes the password entered by the user to control
                    console.log(hashedPassword);
                    console.log(user[0].pass_hash);
                    let passesMatch = hashedPassword === user[0].pass_hash.toLowerCase(); //MS SQL hashed passwords are stored in uppercases, so we need to convert them to lowercase in order to check them
                    if(passesMatch)
                    {
                        console.log("Password is true!"); //if it matches
                    }
                    else
                    {
                        console.log("Wrong password!"); //if it doesn't match
                    }
                    res.json({user, passesMatch}); //sends the result back
                }
                catch(e)
                {
                    console.error("There is no account with this email!"); //if it doesn't find the email
                    res.json({user, passesMatch:null});
                }
        }
    })
})


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
