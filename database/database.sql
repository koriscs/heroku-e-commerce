CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "is_admin" boolean 
);

CREATE TABLE IF NOT EXISTS "address" (
  "customer_id" int REFERENCES customers(id),
  "zipcode" int NOT NULL,
  "country" varchar NOT NULL,
  "city" varchar NOT NULL,
  "street_name" varchar NOT NULL,
  "street_number" varchar NOT NULL,
  "mobile_number" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "item_name" varchar UNIQUE ,
  "description" text NOT NULL,
  "image_url" varchar ,
  "price" float NOT NULL
);

CREATE TABLE  IF NOT EXISTS cart(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id),
product_id int REFERENCES products(id),
size varchar(3) NOT NULL,
quantity int NOT NULL,
sub_total money,
UNIQUE(customer_id, product_id, size)
 );

CREATE TABLE IF NOT EXISTS orders(
id  SERIAL PRIMARY KEY,
customer_id int REFERENCES customers(id),
customer_address text NOT NULL,
date_of_purchase timestamp DEFAULT NOW(),
total_price money NOT NULL
 );

 CREATE TABLE IF NOT EXISTS order_details (
   order_id int REFERENCES orders(id),
   product_name varchar NOT NULL,
   product_size varchar(3) NOT NULL,
   product_quantity int NOT NULL
 );
 





