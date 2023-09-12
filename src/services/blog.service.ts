import axios from 'axios';
import { BlogType } from '../interfaces/blog.interface';
import { FormValues } from './../components/form/form.props';

export const BlogService = {
	async getAllBlogs() {
		const { data } = await axios.get<BlogType[]>(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog`
		);

		return data;
	},

	async getBlogBySlug(slug: string) {
		const { data } = await axios.get<BlogType>(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${slug}`
		);

		return data;
	},

	async deleteBlog(id: string) {
		const { status } = await axios.delete<number>(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${id}`,
			{
				data: { id },
			}
		);

		return status;
	},

	async createBlog(dataForm: FormValues) {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/create`,
			dataForm
		);
		return data;
	},

	async editBlog(dataForm: FormValues, id: string) {
		const { data } = await axios.patch(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${id}`,
			dataForm
		);
		return data;
	},
};
