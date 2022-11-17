import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { fetchFilm } from '../../../api';

function Popular({ type, page }) {
	const filmType = type === 'tv' ? 'TV Shows' : 'Movies';

	const { data } = useQuery({
		queryKey: ['films'],
		queryFn: () => fetchFilm(filmType, page),
		keepPreviousData: true
	});

	return (
		<>
			<Head>
				<title>{`Popular ${type}`}</title>
				<meta name="description" content="popular film" />
			</Head>

			<div style={{ margin: 20, textAlign: 'center' }}>
				<h1>{`Popular ${filmType}`}</h1>
				<br />

				<button disabled={Number(page) === 1}>
					{Number(page) > 1 ? (
						<Link
							href={{
								pathname: `/[type]/popular/[page]`,
								query: {
									type,
									page: Number(page) - 1
								}
							}}
							passHref
						>
							Prev
						</Link>
					) : (
						'Prev'
					)}
				</button>

				<button disabled={Number(page) === 40}>
					{Number(page) < 40 ? (
						<Link
							href={{
								pathname: `/[type]/popular/[page]`,
								query: {
									type,
									page: Number(page) + 1
								}
							}}
							passHref
						>
							Next
						</Link>
					) : (
						'Next'
					)}
				</button>
				<br />
				{data?.results?.map((film, idx) => (
					<Fragment key={idx}>
						<h2>{film.title || film.name}</h2>
					</Fragment>
				))}
				<br />
			</div>
		</>
	);
}

export default Popular;

export const getStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();
	const { type, page } = params;

	await queryClient.prefetchQuery(['films'], () => fetchFilm(type, page));

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
