# Product Management Application

This is a simple product management application built using **React** and **TypeScript**. The application allows you to view, create, edit, and delete products. It includes pagination and allows for product images to be uploaded.

## Features

- **Product List**: Displays a list of products with details such as name, description, and price.
- **Pagination**: Allows navigation through multiple pages of products (5 items per page).
- **Create New Product**: You can add a new product by filling out a form with the product's name, description, price, and image.
- **Edit Product**: You can edit the details of an existing product.
- **Delete Product**: Allows the removal of a product from the list.
- **Image Upload**: The ability to upload an image for new products.
- **Validation**: Ensures that required fields like name and price are provided before saving a product.

## Application Structure

1. **ProductList** - Displays a paginated list of products.
2. **ProductForm** - Form to create or edit a product.
3. **ProductService** - Manages product data and validation.
4. **ProductItem** - Displays individual product details in the list.

## Usage

To run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/product-management.git
    cd product-management
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Known Issues

- The **Save Product** functionality was not able to load the saved products properly into the form (most likely due to an issue with loading the saved data file into the service).
- The saved product data was supposed to be stored in a JSON file, but it wasn't loaded correctly into the service due to an unknown issue.

## Files

1. **ProductService** - Handles fetching and saving products.
2. **Saved Product JSON File**: The products are saved in a JSON file (this part may not work properly at the moment due to an issue with loading the data from the file).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
