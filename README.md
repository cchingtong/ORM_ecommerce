ERD
https://app.diagrams.net/#G1dvFuBMK3KzCVhXy9Qz4LoG3_4_-HaoMj
Entity Relationships
![Screenshot 2024-06-11 183015](https://github.com/cchingtong/ORM_ecommerce/assets/111832160/082e7941-5f2b-445e-8649-25c7dedccba1)

 1. Users- Profiles (1:1)
 ○ Oneusercanhave one profile, and one profile belongs to one user.
 ○ Relationship: Users.user_id-> Profiles.user_id
 2. Categories- Products (1:M)
 ○ Onecategory can have many products, but one product belongs to one category.
 ○ Relationship: Categories.category_id-> Products.category_id
 3. Profile- Orders (1:M)
 ○ Oneusercanhave many orders, but one order belongs to one user.
 ○ Relationship: Users.user_id-> Orders.user_id
 4. Orders- Products (Many:1)
 ○ Oneorder can contain many products, and one product can be in many orders.
 ○ Thismany-to-many relationship is managed through the OrderProducts table.
 ○ Relationship: Orders.order_id-> OrderProducts.order_id and
 Products.product_id-> OrderProducts.product_id

API Endpoints

Users
 ● Create User
 ○ POST /users
 ○ Request body: { "user_id": number, "username": string,
 "email": string }
 ● Get All Users
 ○ GET /users
 ● Update User
 ○ PUT /users/:id
 ○ Request body: { "username": string, "email": string }
 ● Delete User
 ○ DELETE /users/:id
 
 Profiles
 ● Create Profile
 ○ POST /profiles
 ○ Request body: { "profile_id": number, "user_id": number,
 "first_name": string, "last_name": string, "address": string
 }
 ● Get All Profiles
 ○ GET /profiles
 ● Update Profile
 ○ PUT /profiles/:id
 ○ Request body: { "first_name": string, "last_name": string,
 "address": string }
 ● Delete Profile
 ○ DELETE /profiles/:id
 
 Categories
 ● Create Category
 ○ POST /categories
 ○ Request body: { "category_id": number, "name": string }
 ● Get All Categories
 ○ GET /categories
 ● Update Category
 ○ PUT /categories/:id
○ Request body: { "name": string }
 ● Delete Category
 ○ DELETE /categories/:id
 
 Products
 ● Create Product
 ○ POST /products
 ○ Request body: { "product_id": number, "category_id": number,
 "name": string, "price": number }
 ● Get All Products
 ○ GET /products
 ● Search Products
 ○ GET /products/search
 ○ Query parameters: name, category, min_price, max_price
 ● Update Product
 ○ PUT /products/:id
 ○ Request body: { "category_id": number, "name": string,
 "price": number }
 ● Delete Product
 ○ DELETE /products/:id
 
 Orders
 ● Create Order
 ○ POST /orders
 ○ Request body: { "order_id": number, "user_id": number,
 "order_date": string }
 ● Get All Orders
 ○ GET /orders
 ● Search Orders
 ○ GET /orders/search
 ○ Query parameters: user_id, order_date
 ● Update Order
 ○ PUT /orders/:id
 ○ Request body: { "user_id": number, "order_date": string }
 ● Delete Order
 ○ DELETE /orders/:id
