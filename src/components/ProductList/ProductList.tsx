import React from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

interface Props {
	products: Product[];
	selectedId: number | null;
	onSelect: (product: Product) => void;
	onDelete: (id: number) => void;
}

export const ProductList: React.FC<Props> = ({
	products,
	selectedId,
	onSelect,
	onDelete
}) => {
	return (
		<div className={styles.list}>
			{products.length > 0 ? (
				products.map(product => (
					<ProductItem
						key={product.id}
						product={product}
						isSelected={selectedId === product.id}
						onSelect={onSelect}
						onDelete={onDelete}
					/>
				))
			) : (
				<div className={styles.empty}>Items not found</div>
			)}
		</div>
	);
};