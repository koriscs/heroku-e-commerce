CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "username" varchar,
  "password" varchar,
  "email" varchar UNIQUE,
  "is_admin" boolean 
);

CREATE TABLE IF NOT EXISTS "address" (
  "customer_id" int REFERENCES customers(id),
  "zipcode" int,
  "country" varchar,
  "city" varchar,
  "street_name" varchar,
  "stree_number" varchar,
  "mobile_number" int
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "item_name" varchar UNIQUE,
  "description" text,
  "image_url" varchar,
  "price" float
);

CREATE TABLE cart(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id),
product_id int REFERENCES products(id),
size varchar(3),
quantity int,
UNIQUE(customer_id, product_id, size)
 );

CREATE TABLE orders(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id),
customer_address text,
date_of_purchase timestamp,
total_price money
 );

 CREATE TABLE order_details (
   order_id int REFERENCES orders(id),
   product_name varchar,
   product_size varchar(3),
   product_quantity int,
 );
 





