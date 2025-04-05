import { Product, ProductFormErrors } from "../types/Product";

export class ProductService {
	private static STORAGE_KEY = 'products';
	private static lastId = 0;

	private static initializeLastId(products: Product[]): void {
		const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
		this.lastId = maxId;
	}

	private static generateId(): number {
		return ++this.lastId;
	}

	private static getCurrentDate(): Date {
		return new Date();
	}

	// Изменено: теперь возвращает статические данные
	static async getInitialProducts(): Promise<Product[]> {
		const savedProducts = [
			{
				"name": "book",
				"description": "A most interesting novel",
				"price": 20,
				"image": "/images/book.jpg"
			},
			{
				"name": "pen",
				"description": "Beautiful pen",
				"price": 5,
				"image": "/images/pen.jpg"
			},
			{
				"name": "pencil",
				"description": "Great pencil",
				"price": 3,
				"image": "/images/pencil.jpg"
			},
			{
				"name": "notebook",
				"description": "Unique snow-white notebook",
				"price": 7,
				"image": "/images/notebook.jpg"
			},
			{
				"name": "ruler",
				"description": "Perfectly straight ruler",
				"price": 4,
				"image": "/images/ruler.jpg"
			}
		];

		const products = savedProducts.map((product: any) => ({
			...product,
			id: this.generateId(),
			creationDate: this.getCurrentDate(),
		}));

		this.initializeLastId(products);
		return products;
	}

	static getProducts(): Product[] {
		const saved = localStorage.getItem(this.STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved).map((p: any) => ({
				...p,
				creationDate: new Date(p.creationDate),
			}));
			this.initializeLastId(parsed);
			return parsed;
		}
		return [];
	}

	static saveProducts(products: Product[]): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
	}

	static addProduct(products: Product[], newProduct: Omit<Product, 'id' | 'creationDate'>): Product[] {
		const productWithIdDate: Product = {
			...newProduct,
			id: this.generateId(),
			creationDate: this.getCurrentDate(),
		};
		return [...products, productWithIdDate];
	}

	static updateProduct(products: Product[], updatedProduct: Product): Product[] {
		return products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
	}

	static deleteProduct(products: Product[], id: number): Product[] {
		return products.filter((p) => p.id !== id);
	}

	static validateProduct(product: Partial<Product>): ProductFormErrors {
		const errors: ProductFormErrors = {};
		if (!product.name || product.name.trim().length === 0) {
			errors.name = 'Name is required';
		} else if (product.name.length > 30) {
			errors.name = 'Name must be 30 characters or less';
		}

		if (product.description && product.description.length > 200) {
			errors.description = 'Description must be 200 characters or less';
		}

		if (!product.price || product.price <= 0) {
			errors.price = 'Price must be greater than 0';
		}

		return errors;
	}
}
