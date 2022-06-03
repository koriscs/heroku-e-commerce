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

CREATE TABLE IF NOT EXISTS "order" (
  "customer_id" int REFERENCES customers(id),
  "id" SERIAL PRIMARY KEY,
  "date_of_purchase" date,
  "total_price" int
);

CREATE TABLE IF NOT EXISTS "order_products" (
  "order_id" int REFERENCES "order"(id),
  "product_id" int REFERENCES products(id),
  "quantity" int,
  "total_price" int,
  UNIQUE(order_id, product_id)
);

CREATE TABLE IF NOT EXISTS "cart" (
  "customer_id" int REFERENCES customers(id),
  "id" SERIAL PRIMARY KEY,
  "date_of_purchase" date,
  "total_price" int
);

CREATE TABLE IF NOT EXISTS "cart_products" (
  "cart_id" int REFERENCES cart(id),
  "product_id" int REFERENCES products(id),
  "quantity" int,
  "total_price" int,
  UNIQUE(cart_id, product_id)
);


