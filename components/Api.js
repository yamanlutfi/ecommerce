const Api = (url, method, body = {}) => {
	var token = ""
	if(localStorage.getItem("token")){
		token = localStorage.getItem("token")
	}
	const requestOptions = {
		method: method,
		headers: { 
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(body)
	};
	return fetch(process.env.API + url, requestOptions)
		.then(response => response.json())
		.then(data => {
			return data
		});
}

export default Api