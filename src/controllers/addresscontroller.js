const pool = require('../../database');
const queries = require('../queries');

const getAllAddress = (req, res) =>{
    if(req.user.is_admin) {
        pool.query(queries.getAddresses, (error, results) =>{
            if(error) throw error;
            res.status(200).json(results.rows);
        } )
    } else {

    }
}

const getAddress = (req, res) =>{
    const id = parseInt(req.params.customer_id);
  
    if(!req.user.is_admin && req.user.id !== id) {
        return res.status(401).json({msg: "You are not authorized to get this User's data!"});
    }
    

    pool.query(queries.getAddress,[id], (error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "We didn't find address information for this customer"})
        } else {
        res.status(200).json(results.rows);
        }
    })
}

const updateAddress =(req, res) =>{
    const id = parseInt(req.params.customer_id);
    if(!req.user.is_admin && req.user.id !== id) {
        return res.status(401).json({msg: "You are not authorized to get this User's data!"});
    }
    const {zipcode, country, city, street_name, street_number, mobile_number} = req.body;
    pool.query(queries.getAddress, [id], (error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            return res.status(404).json({msg: "There is no address for this customer with this id!"})
        } else {
            pool.query(queries.updateAddress, [id ,zipcode, country, city, street_name, street_number, mobile_number], (error, results) =>{
                if(error) throw error;
                return res.status(200).json({msg: "Customer address sucesfully updated!"});
            })
        }
    })

    
}

module.exports = {
    getAllAddress,
    getAddress,
    updateAddress
}