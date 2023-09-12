import { TimeCalculate } from 'src/utils/time';
import { BlogCardProps } from './blog-card.props';
import { useRouter } from 'next/router';
import { BlogService } from '@/src/services/blog.service';

const BlogCard = ({ blog }: BlogCardProps) => {
	const router = useRouter();
	const handleDelete = async () => {
		try {
			const statusResponse = await BlogService.deleteBlog(blog._id);
			if (statusResponse === 200) {
				router.replace(router.asPath);
			}
		} catch (error) {
			const result = error as Error;
			console.log(result.message);
		}
	};
	return (
		<div className='col' key={blog._id}>
			<div className='card shadow-sm'>
				<div className='card-body'>
					<h5 className='card-title'>{blog.title}</h5>
					<p className='card-text'>{blog.description}</p>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='btn-group'>
							<button
								type='button'
								className='btn btn-sm btn-outline-secondary'
								onClick={() => router.push(`/${blog.slug}`)}
							>
								View
							</button>
							<button
								type='button'
								className='btn btn-sm btn-outline-secondary'
								onClick={() => router.push(`/edit/${blog.slug}`)}
							>
								Edit
							</button>
							<button
								type='button'
								className='btn btn-sm btn-outline-secondary'
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
						<small className='text-body-secondary'>
							{TimeCalculate(blog.description)} mins
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
