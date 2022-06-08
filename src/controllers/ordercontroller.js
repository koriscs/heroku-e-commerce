const pool = require('../../database');
const queries = require('../queries');


const getCustomersOrders = (req, res) =>{
    const id = req.params.customerId;

    pool.query(queries.getCustomersOrders, [id], (error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            return res.status(404).json({msg: "There is no order placed for this customer!"});
        } else {
           return res.status(200).json(results.rows);
        }
    } )

}

const getOrder = (req, res) =>{
    const customer_id = req.params.customerId;
    const order_id = req.params.orderId;

    pool.query(queries.getCustomersOrders, [customer_id], (error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            return res.status(404).json({msg: "There is no order placed for this customer!"});
        } else {
           pool.query(queries.getSpecificOrder, [customer_id, order_id], (error, results) =>{
               if(error) throw error;
               if(!results.rows.length) {
                   return res.status(404).json({msg: "We could not find an order by this id!"});
               } else {
                   return res.status(200).json(results.rows);
               }
           } )
        }
    } )

}

module.exports = {
    getCustomersOrders,
    getOrder
}