const pool = require('../../database');
const queries = require('../queries');

const addItemToCart = (req, res) =>{
    const id = parseInt(req.params.customerId);

    if(!req.user.is_admin && !req.user.is_admin) {
       return res.status(401).json({msg: "You are not authorized to add to this Cart!"});
    }
    const {product_id, size, quantity} = req.body;
    if(!product_id || !size || isNaN(quantity) ) {
        return res.status(400).json({msg: "Pls give all informations correctly!"});
    }
    //Getting the price of an item
    pool.query(queries.getPrice, [product_id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "We couldn't get the price for this ID!"})
        } else {
            price = parseInt(results.rows[0].price);

            const sub_total = parseInt(quantity) * price;

            pool.query(queries.selectById, [id], (error, results) =>{
                if(error) throw error;
                if(!results.rows.length) {
                    res.status(404).json({msg: "There is no customer with this customer_ID!"})
                } else {
                    pool.query(queries.addItemToCart, [id, product_id, size, quantity, sub_total], (error, results) =>{
                        if(error) throw error;
                        res.status(201).json({msg:"Item/items sucesfully added to your cart!"})
                    } )
                }
            })
        }

    })
}

const getCart = (req, res) =>{
    const id = parseInt(req.params.customerId);

    if(req.user.id !== id && !req.user.is_admin) {
        return res.status(401).json({msg: "You are not authorized to see this Cart!"});
     }  
     pool.query(queries.selectCustomer, [id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "There is no cart with this customer_ID!"})
        } else {
            res.status(200).json(results.rows);
           
        }
    })

}

const checkOut = (req, res) =>{
    const id = parseInt(req.params.customerId);

    if(req.user.id !== id && !req.user.is_admin) {
        return res.status(401).json({msg: "You are not authorized to Checkout this cart!"});
     } 
     pool.query(queries.selectCustomer, [id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "There is no cart with this customer_ID to checkout!"})
        } else {
           const order_array = results.rows;

            pool.query(queries.getAddress, [id], (error, results) =>{
                if (error) throw error;
                if(!results.rows.length) {
                    return res.status(404).json({msg: "There is no address information for this user pls give address information for the user first!"});
                } else {
                const addressObject = results.rows[0];
                const address = `${addressObject.zipcode}, ${addressObject.country} ${addressObject.city} ${addressObject.street_name} street ${addressObject.street_number}.`;
                pool.query(queries.getTotal, [id], (error, results) =>{
                    if(error) throw error;
                    const total_price = results.rows[0].total_price;
                    pool.query(queries.addOrder, [id, address, total_price], (error, results) =>{
                        if(error) throw error;
                        const order_id = results.rows[0].id;

                         order_array.forEach(order_item =>{
                             pool.query(queries.addOrderDetails, [order_id, order_item.size, order_item.quantity, order_item.product_id], (error, results)=>{
                                if (error) throw error;
                                
                            })
                        })
                        pool.query(queries.deleteCustomersCart, [id], (error, results)=>{
                            if(error) throw error;
                        })
                        res.status(200).json({msg:"Your order was sucesfully added!"})                        
                    })
                })
              }
                
            })    
        }
    })
     
}
const updateCart = (req, res) =>{
    const id= req.params.customerId;
    const cartId =req.params.cartId;
    const { quantity } = req.body;

    if(req.user.id !== id && !req.user.is_admin) {
        return res.status(401).json({msg: "You are not authorized to Checkout this cart!"});
     } 
    pool.query(queries.findCart, [cartId], (error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "We couldn't find a cart with this id"});
        } else {
            const product_id = results.rows[0].product_id;
            pool.query(queries.getProduct, [product_id], (error, results)=>{
                  const price = parseInt(results.rows[0].price);
                 //console.log(price);
            
            if (parseInt(quantity) === 0) {
                pool.query(queries.deleteCart, [cartId], (error, results)=>{
                    res.status(200).json({msg: "You set the quantity to 0 so we deleted that item from your cart!"})
                })
            } else {
                const sub_total = quantity * price;
                pool.query(queries.updateQuantity, [quantity, sub_total, cartId], (error, results)=>{
                    if (error) throw error;
                    res.status(200).json({msg: "The quantity was updated!"});
                })
            }
        })
        }
    })
}

const deleteCart = (req, res) =>{
    const id = parseInt(req.params.customerId);
    const cartId = parseInt(req.params.cartId); 

    if(req.user.id !== id && !req.user.is_admin) {
        return res.status(401).json({msg: "You are not authorized to see this Cart!"});
     }
     pool.query(queries.findCart, [cartId], (error, results) =>{
         if (error) throw error;
         if(!results.rows.length) {
             return res.status(404).json({msg: "We could not find a cart with this id!"})
         } else {
             pool.query(queries.deleteCart, [cartId], (error, results) =>{
                 if (error) throw error;
                 return res.status(200).json({msg:"Your cart was deleted"});
             })
         }
     })
     
}

module.exports = {
  addItemToCart,
  getCart,
  checkOut,
  updateCart,
  deleteCart
}