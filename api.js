import axios from 'axios';

const api = 'https://api.themoviedb.org/3';

const envFile = process.env.API_KEY;
console.log(envFile);
export const fetchFilm = async ({ queryKey }) => {
	const film = queryKey[1] === 'tv' ? 'tv' : 'movie';
	const page = queryKey[2];

	const options = {
		method: 'GET',
		url: `${api}/${film}/popular`,
		params: {
			api_key: '456ec94d71f9702ddcbbc1166b40f922',
			page
		}
	};

	console.log(options);

	const data = await axios(options).then((res) => res.data);

	return data;
};
