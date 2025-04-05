import React, { useState, useEffect } from 'react';
import { Product, ProductFormErrors } from '../../types/Product';
import styles from './ProductForm.module.scss';
import { ProductService } from '../../service/ProductService';

interface Props {
	product: Product;
	isNew: boolean;
	onSave: (product: Product) => void;
	onCancel: () => void;
}

export const ProductForm: React.FC<Props> = ({
	product,
	isNew,
	onSave
	
}) => {
	const [formData, setFormData] = useState<Product>({ ...product });
	const [errors, setErrors] = useState<ProductFormErrors>({});

	useEffect(() => {
		setFormData({ ...product });
		setErrors({});
	}, [product]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: name === 'price' ? parseFloat(value) || 0 : value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const validationErrors = ProductService.validateProduct(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			onSave(formData);
		}
	};

	return (
		<div className={styles.formContainer}>
			<h2>{isNew ? 'New item' : 'Editing'}</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label>Name*</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={errors.name ? styles.error : ''}
					/>
					{errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
				</div>

				<div className={styles.formGroup}>
					<label>description</label>
					<textarea
						name="description"
						value={formData.description || ''}
						onChange={handleChange}
						rows={4}
						className={errors.description ? styles.error : ''}
					/>
					{errors.description && <span className={styles.errorMsg}>{errors.description}</span>}
				</div>

				<div className={styles.formGroup}>
					<label>price*</label>
					<input
						type="number"
						name="price"
						min="0.01"
						step="0.01"
						value={formData.price}
						onChange={handleChange}
						className={errors.price ? styles.error : ''}
					/>
					{errors.price && <span className={styles.errorMsg}>{errors.price}</span>}
				</div>

				{}
				<div className={styles.formActions}>
					<button type="submit" disabled={Object.keys(errors).length > 0}>
						Save
					</button>
				</div>
			</form>
		</div>

	);
};