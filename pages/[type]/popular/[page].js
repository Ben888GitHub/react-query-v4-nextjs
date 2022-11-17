import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { fetchFilm } from '../../../api';

function Popular({ type, page }) {
	const filmType = type === 'tv' ? 'TV Shows' : 'Movies';

	const { data } = useQuery({
		queryKey: ['films', type, page],
		queryFn: fetchFilm,
		keepPreviousData: true
	});

	// data && console.log(data);

	return (
		<div style={{ margin: 20, textAlign: 'center' }}>
			<h1>{`Popular ${filmType}`}</h1>
			<br />
			{data?.results?.map((film, idx) => (
				<Fragment key={idx}>
					<h2>{film.title || film.name}</h2>
				</Fragment>
			))}
		</div>
	);
}

export default Popular;

export const getStaticProps = async ({ params }) => {
	const { type, page } = params;

	console.log(type, page);

	return {
		props: {
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