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
	onSave,
	onCancel
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

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setFormData(prev => ({
				...prev,
				image: reader.result as string
			}));
		};
		reader.readAsDataURL(file);
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

				<div className={styles.imagePreview}>
					<img
						src={formData.image || '/placeholder.png'}
						alt="Product"
						className={styles.productImage}
					/>

					{isNew && (
						<input type="file" accept="image/*" onChange={handleImageChange} />
					)}
				</div>

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
					<label>Description</label>
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
					<label>Price*</label>
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

				<div className={styles.formActions}>
					<button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
					<button type="submit" className={styles.saveButton}>Save</button>
				</div>
			</form>
		</div>
	);
};
