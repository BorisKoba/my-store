
export interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	creationDate: Date;
	image: string;
}
export interface ProductFormErrors {
	name?: string;
	description?: string;
	price?: string;
}