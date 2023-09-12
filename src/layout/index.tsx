import { Navbar } from '../components';
import { LayoutProps } from './layout.props';

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<div className='container'>{children}</div>
		</>
	);
};

export default Layout;
