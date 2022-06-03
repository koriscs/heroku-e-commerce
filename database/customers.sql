INSERT INTO customers (first_name,last_name ,username ,password ,email)
VALUES ('Csaba', 'Burjan','koriscs','mivanott', 'kukacka@gmail.com'),
        ('Lajos', 'Kovacs','koki','asd','kovilajos@gmail.com');

        ALTER TABLE "address" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("id") REFERENCES "order_products" ("order_id");

ALTER TABLE "order_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("id") REFERENCES "cart_products" ("cart_id");

ALTER TABLE "cart_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");