import React, { useState } from 'react';
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
	onDelete,
}) => {
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(products.length / itemsPerPage);
	const paginatedProducts = products.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePageChange = (newPage: number) => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div className={styles.listWrapper}>
			<div className={styles.list}>
				{paginatedProducts.length > 0 ? (
					paginatedProducts.map((product) => (
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

			{totalPages > 1 && (
				<div className={styles.pagination}>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={styles.paginationButton}
					>
						&lt; Prev Page
					</button>

					<span className={styles.pageInfo}>
						{currentPage} of {totalPages}
					</span>

					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={styles.paginationButton}
					>
						Next Page &gt;
					</button>
				</div>
			)}
		</div>
	);
};
