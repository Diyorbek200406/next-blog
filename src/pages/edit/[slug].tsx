import Form from '@/src/components/form/form';
import { FormValues } from '@/src/components/form/form.props';
import { BlogType } from '@/src/interfaces/blog.interface';
import Layout from '@/src/layout';
import { BlogService } from '@/src/services/blog.service';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

const EditBlog: NextPage<EditBlogPageProps> = ({ blog }) => {
	const onSubmit = async (formData: FormValues) => {
		const data = await BlogService.editBlog(formData, blog._id);
		return data;
	};

	return (
		<Layout>
			<Form
				onSubmit={onSubmit}
				sectionTitle={`Edit ${blog.title}`}
				values={blog}
			/>
		</Layout>
	);
};

export default EditBlog;

export const getServerSideProps: GetServerSideProps<
	EditBlogPageProps
> = async ({ query }) => {
	const blog = await BlogService.getBlogBySlug(query.slug as string);
	return {
		props: { blog },
	};
};

interface EditBlogPageProps {
	blog: BlogType;
}
