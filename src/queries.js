const checkEmail = 'SELECT s FROM customers s WHERE s.email = $1';
const registerUser = 'INSERT INTO customers (first_name, last_name, username, password, email) VALUES ($1, $2, $3, $4, $5);'
const getUser = 'SELECT * FROM customers WHERE username = $1';
const selectById = 'SELECT * FROM customers WHERE id = $1';

module.exports={
    checkEmail,
    registerUser,
    getUser,
    selectById
}