import { useEffect, useState } from 'react';
function Home() {
	const [user, setUser] = useState<any>({});
	useEffect(() => {
		const storeData = window.localStorage.getItem('employee');

		if (storeData) {
			setUser(JSON.parse(storeData));
		}
	}, []);
	return (
		<div className='body-content'>
			<h1>{user ? user.name : 'Home Page'}</h1>
		</div>
	);
}

export default Home;
