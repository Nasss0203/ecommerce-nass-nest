# E-commerce System Architecture Overview

The E-commerce system is built on the NestJS platform, following a modular approach to ensure scalability and maintainability. The system is designed according to Domain Driven Design (DDD) principles for effective business logic management.

## Module Structure

The system includes the following main modules:

### 1. Auth Module

- Manages user authentication and authorization
- Integrates with Tokens Module for JWT management

### 2. Products Module

- Manages product information
- Integrates with SPU (Standard Product Unit) and SKU (Stock Keeping Unit)
- Supports product variant management
- Integrates product reviews and ratings

### 3. Category Module

- Manages product categories
- Supports multi-level category structure

### 4. Brand Module

- Manages brand information
- Links with products

### 5. Inventory Module

- Manages inventory
- Tracks product quantities

### 6. Cart Module

- Manages shopping cart
- Integrates with Discount Module

### 7. Checkout Module

- Processes checkout workflow
- Integrates with Order Module

### 8. Order Module

- Manages orders
- Tracks order status

### 9. Discount Module

- Manages discount codes and promotions
- Integrates with Cart and Checkout

### 10. Revenue Module

- Revenue statistics and reporting
- Sales data analysis

### 11. Mail Module

- Sends notification emails
- Order and account confirmation

### 12. File Module

- Manages files and images
- Integrates with Cloudinary

### 13. Database Module

- Configures and manages database connections

### 14. SPU and SKU Module

- SPU: Manages standard product units
- SKU: Manages stock keeping units

## Technologies Used

- **Framework**: NestJS
- **Database**: MongoDB (through DatabaseModule)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Email Service**: Integrated through MailModule

## Core Features

1. **Product Management**

   - Product variant support
   - Image management
   - Categories and brands

2. **Order Management**

   - Checkout process
   - Status tracking
   - Discount integration

3. **User Management**

   - Authentication and authorization
   - Shopping cart management
   - Order history

4. **Reports and Statistics**
   - Revenue
   - Inventory
   - Sales analysis

## Main Processing Flows

1. **Purchase Flow**

   - Browse products
   - Add to cart
   - Apply discount code
   - Checkout
   - Order confirmation

2. **Product Management Flow**

   - Create/update product information
   - Manage inventory
   - Update prices and promotions

3. **Order Processing Flow**
   - Receive order
   - Process payment
   - Update inventory
   - Send confirmation email
