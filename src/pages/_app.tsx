import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
