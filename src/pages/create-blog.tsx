import { useState } from 'react';
import Form from '../components/form/form';
import Layout from '../layout';
import { FormValues } from '../components/form/form.props';
import { BlogService } from '../services/blog.service';

const CreateBlog = () => {
	const onSubmit = async (formData: FormValues) => {
		const data = await BlogService.createBlog(formData);
		return data;
	};

	return (
		<Layout>
			<Form onSubmit={onSubmit} sectionTitle='Create blog' />
		</Layout>
	);
};

export default CreateBlog;
