import React, { useState, useEffect } from 'react';
import { Product } from './types/Product';
import { ProductList } from './components/ProductList/ProductList';
import styles from './App.module.scss';
import { ProductService } from './service/ProductService';
import { ProductForm } from './components/ProductForm/ProductForm';

const App: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [isNewProduct, setIsNewProduct] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

	useEffect(() => {
		const loadProducts = async () => {
			const initialProducts = await ProductService.getInitialProducts();
			setProducts(initialProducts);
		};
		loadProducts();
	}, []);

	useEffect(() => {
		ProductService.saveProducts(products);
	}, [products]);

	const handleAddProduct = () => {
		setSelectedId(null);
		setIsNewProduct(true);
	};

	const handleSaveProduct = (product: Product) => {
		if (isNewProduct) {
			setProducts(prev => ProductService.addProduct(prev, product));
		} else {
			setProducts(prev => ProductService.updateProduct(prev, product));
		}
		setSelectedId(product.id);
		setIsNewProduct(false);
	};

	const handleDeleteProduct = (id: number) => {
		setProducts(prev => ProductService.deleteProduct(prev, id));
		if (selectedId === id) {
			setSelectedId(null);
		}
	};

	const filteredProducts = products
		.filter(p =>
			p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		.sort((a, b) => {
			if (sortBy === 'name') return a.name.localeCompare(b.name);
			return b.creationDate.getTime() - a.creationDate.getTime();
		});

	const selectedProduct = products.find(p => p.id === selectedId);

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>My Store</h1>
			</header>

			<div className={styles.container}>
				<div className={styles.sidebar}>
					<div className={styles.controls}>
						<button onClick={handleAddProduct}>+Add</button>
						<input
							type="text"
							placeholder="search product"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<text className={styles.sort}>Sort by</text>
						<select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
							<option value="name">Name</option>
							<option value="date">Recently Added</option>
						</select>
						
					</div>

					<ProductList
						products={filteredProducts}
						selectedId={selectedId}
						onSelect={(p) => {
							setSelectedId(p.id);
							setIsNewProduct(false);
						}}
						onDelete={handleDeleteProduct}
					/>
				</div>

				<div className={styles.content}>
					{selectedId || isNewProduct ? (
						<ProductForm
							product={selectedProduct || {
								id: 0,
								name: '',
								description: '',
								price: 0,
								creationDate: new Date(),
								image: ''
							}}
							isNew={isNewProduct}
							onSave={handleSaveProduct}
							onCancel={() => {
								setSelectedId(null);
								setIsNewProduct(false);
							}}
						/>
					) : (
						<div className={styles.placeholder}>
							Select a product or create a new one
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
