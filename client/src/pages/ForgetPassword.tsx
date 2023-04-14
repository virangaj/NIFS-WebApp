import React from 'react';
import { useParams } from 'react-router-dom';

function ForgetPassword() {
	const { id } = useParams();

	return <div>ForgetPassword user - {id}</div>;
}

export default ForgetPassword;
