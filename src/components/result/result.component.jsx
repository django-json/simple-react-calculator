import React from 'react';

const Result = ({ result }) => {
	if(result === "") {
		result = 0;
	}

	return (
		<div className="result">
			<span>{result}</span>
		</div>
	);
}

export default Result;