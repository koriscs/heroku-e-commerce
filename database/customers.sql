INSERT INTO customers (first_name,last_name ,username ,password ,email)
VALUES ('Csaba', 'Burjan','koriscs','mivanott', 'kukacka@gmail.com'),
        ('Lajos', 'Kovacs','koki','asd','kovilajos@gmail.com');

INSERT INTO cart (customer_id, product_id, size, quantity) VALUES (3, 1, 'M', 3), (3, 2, 'S', 2), (3, 4, 'L', 5);

SELECT C.customer_id, SUM(P.price*C.quantity) as total_price
FROM cart as C
JOIN products as P
  ON C.product_id = P.id
  GROUP BY C.customer_id;
