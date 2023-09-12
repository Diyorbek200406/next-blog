import { GetServerSideProps, NextPage } from 'next';
import { BlogType } from '../interfaces/blog.interface';
import { BlogService } from '../services/blog.service';
import BlogCard from '../components/blog-card/blog-card';
import Layout from '../layout';

const Home: NextPage<HomePageProps> = ({ blogs }) => {
	return (
		<Layout>
			<div className='album py-5'>
				<div className='container'>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{blogs.map(blog => {
							return <BlogCard blog={blog} key={blog._id} />;
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<
	HomePageProps
> = async () => {
	const blogs = await BlogService.getAllBlogs();
	return {
		props: { blogs },
	};
};

interface HomePageProps {
	blogs: BlogType[];
}
