CREATE DATABASE db_utrust_react;

USE db_utrust_react;

CREATE TABLE userData(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](30) NOT NULL,
	[last_name] [varchar](30) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[pass_hash] [varchar](64) NOT NULL
)

CREATE TABLE [dbo].[products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](50) NOT NULL,
	[product_category_ID] [int] NOT NULL,
	[product_price] [real] NOT NULL,
	[product_quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [product_categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[products]  WITH CHECK ADD FOREIGN KEY([product_category_ID])
REFERENCES [dbo].[product_categories] ([id])

INSERT INTO userData(first_name,last_name,email,pass_hash) VALUES('Hakan','Yilmaz','hakan.yilmaz@email.com', CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '1234567'), 2))

INSERT INTO product_categories(category_name) VALUES ('Electronics')
INSERT INTO product_categories(category_name) VALUES ('Computers')
INSERT INTO product_categories(category_name) VALUES ('Accessories')
INSERT INTO product_categories(category_name) VALUES ('Smartphone')

INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Wireless Mouse',1,249.99,40)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Wireless Keyboard',1,589.99,20)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('AMD 6-core 512GB SSD Laptop',2,12999,10)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Intel 8-core 1TB HDD Laptop',2,17999,15)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Intel 2-core 128 HDD Notebook',2,9999,15)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Webcam w/ Microphone',3,989.99,20)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Mini USB PC Speaker',3,199.99,30)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('Super Bass PC Speaker',3,399.99,15)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('32GB Entry Level Smartphone',4,4999,10)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('128GB 8-Core Smartphone',4,14999,10)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('256GB Flagship Smartphone',4,29999,10
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('RGB LED Wireless Mouse',1,599.99,25)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('AMD 2-core 128GB Notebook',2,10489,5)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('4-Port USB Multiplier',3,169.99,20)
INSERT INTO products(product_name,product_category_ID,product_price,product_quantity) VALUES ('64GB Dual-SIM Smartphone',4,7999,15)