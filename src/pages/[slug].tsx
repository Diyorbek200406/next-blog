import { GetServerSideProps, NextPage } from 'next';
import { BlogType } from '../interfaces/blog.interface';
import { BlogService } from '../services/blog.service';
import { useRouter } from 'next/router';
import Layout from '../layout';

const DetailedBlog: NextPage<DetailedBlogPageProps> = ({ blog }) => {
	const router = useRouter();
	return (
		<Layout>
			<div className='container py-5'>
				<button
					className='btn btn-outline-primary'
					onClick={() => router.push('/')}
				>
					Back
				</button>
				<h1 className='text-center py-2'>{blog.title}</h1>
				<h5 className='text-center'>{blog.description}</h5>
			</div>
		</Layout>
	);
};
export default DetailedBlog;

export const getServerSideProps: GetServerSideProps<
	DetailedBlogPageProps
> = async ({ query }) => {
	const blog = await BlogService.getBlogBySlug(query.slug as string);
	return {
		props: { blog },
	};
};

interface DetailedBlogPageProps {
	blog: BlogType;
}
