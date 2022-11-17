import '../styles/globals.css';
import {
	QueryClient,
	QueryClientProvider,
	Hydrate
} from '@tanstack/react-query';
import { useState } from 'react';
// Create a client
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false,
// 			refetchOnMount: false
// 		}
// 	}
// });

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
