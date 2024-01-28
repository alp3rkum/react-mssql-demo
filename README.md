# react-mssql-demo
A simple ReactJS-MSSQL integration demo that makes use of MSNodeSQLV8, Syncfusion EJ2-React and Express frameworks.

## Specifications

In this project, there are two versions of data fetching system; one of them makes use of Javascript's standard Fetch API in its data grid screen, and the other one uses Syncfusion's EJ2-Data library in place of it. The latter one specifically uses DataManager, WebApiAdaptor and Query classes of the said library.

Both versions make use of state variables at Frontend, which come in handy as the datas are rendered and paginated in GridComponent of Syncfusion's EJ2-react-grids library. The pagination is done within the backend, using SQL queries.

For user login and product datas, there are a total of three tables created in the database: user data, product data and product categories data, with the latter two are in relations via product category ID. This relation is used in retrieving the name of the categories with query.

### API

The backend API of the application is using Express.js framework, MSNodeSQLV8 driver and crypto module.

#### API Routes

##### / (GET)

The main 'index' page of the backend API. It just prints a welcome message.

##### /api/userData (GET)

Retrieves the users that can login to the system in JSON format.

##### /api/products (GET)

Retrieves all products in the database

##### /api/products/count (GET)

Retrieves the count of products in the database. Used for enhancing pagination limits.

##### /api/products/page=(page) (GET)

Paginates counts by 10 (eg page 1 is from 1 to 19, page 2 is from 11 to 20). This route was used during development to test pagination by query.

##### /api/products/id=(page) (GET)

Gets a specific product by its ID. A such route is rather essential in backend API's.

##### /api/products/order=(order) desc/page=(page) (GET)

This route is the way the application retrieves its datas for GridComponent view in its Frontend. It orders the products according to their either ID, product name, category, price and quantity. It can also be sorted in ascending or descending order. The ordered list of datas then gets paginated.

The order and ascend/descend value is directly used inside the query.

Example -> /api/products/order=p.id(%20)ASC/page=1 uses the query of "SELECT p.id, p.product_name, pc.category_name, p.product_price, p.product_quantity
    FROM products p JOIN product_categories pc ON p.product_category_ID = pc.id
    ORDER BY p.id ASC OFFSET ((page-1)*10) ROWS FETCH NEXT 10 ROWS ONLY

##### /api/userLogin (POST)

This is the only POST request sent by this application demo, and it serves the purpose of checking user credentials entered by the user according to database.

This section of the API finds if there is any record within userData table with the specified email. If not, then it immediately returns an error. Else, it then goes onto check the password, or more specifically the HASH of the password.

The HASH of the password is in SHA256 hexadecimal, and it is stored as such in the database, so the password entered by the user gets hashed by SHA256 and written in hexadecimal. Two hashes are compared and the result is returned to the Frotend along with the user data. If it matches, the Frontend system redirects into the landing page, passing the user data for visual purposes. If not, a simple error message is triggered.