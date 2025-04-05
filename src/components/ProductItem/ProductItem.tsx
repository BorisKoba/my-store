import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductItem.module.scss';

interface Props {
	product: Product;
	isSelected: boolean;
	onSelect: (product: Product) => void;
	onDelete: (id: number) => void;
}

export const ProductItem: React.FC<Props> = ({
	product,
	isSelected,
	onSelect,
	onDelete
}) => {
	return (
		<div
			className={`${styles.productItem} ${isSelected ? styles.selected : ''}`}
			onClick={() => onSelect(product)}
		>
			<img src={product.image} alt={product.name} className={styles.productImage} />
			<div className={styles.productInfo}>
				<h3>{product.name}</h3>
				<p>{product.description || 'no description'}</p>
				<div className={styles.productMeta}>
					<span className={styles.price}>${product.price.toFixed(2)}</span>
					<span className={styles.date}>
						{product.creationDate.toLocaleDateString()}
					</span>
				</div>
			</div>
			{/* Кнопка "Delete" */}
			<button
				className={styles.deleteBtn}
				onClick={(e) => {
					e.stopPropagation();
					onDelete(product.id);
				}}
			>
				Delete
			</button>
		</div>
	);
};
