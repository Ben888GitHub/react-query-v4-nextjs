import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { Fragment } from 'react';
import { fetchFilm } from '../../../api';

function Popular({ type, page }) {
	const filmType = type === 'tv' ? 'TV Shows' : 'Movies';

	const { data } = useQuery({
		queryKey: ['films', type, page],
		queryFn: fetchFilm,
		keepPreviousData: true
	});

	return (
		<>
			<Head>
				<title>{`Popular ${type}`}</title>
				<meta name="description" content="popular film" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div style={{ margin: 20, textAlign: 'center' }}>
				<h1>{`Popular ${filmType}`}</h1>
				<br />
				{data?.results?.map((film, idx) => (
					<Fragment key={idx}>
						<h2>{film.title || film.name}</h2>
					</Fragment>
				))}
			</div>
		</>
	);
}

export default Popular;

export const getStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();
	const { type, page } = params;

	await queryClient.prefetchQuery(['films', type, page], fetchFilm);

	// console.log(type, page);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			type,
			page
		}
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking'
	};
};
