const ApiQuery = (url, method, body = null) => {
    var token = ""
    if (typeof window !== 'undefined') {
      if(localStorage.getItem("token")){
        token = localStorage.getItem("token")
      }
    }
    var requestOptions = {
      method: method,
      headers: { 
        "Content-Type": "application/json",
        "authorization": token
      }
    }
    if(body != null){
      requestOptions['body'] = JSON.stringify(body)
    }
    return fetch(process.env.API + url, requestOptions).then(response => response.json())
		.then(data => {
			return data
		});
}

export default ApiQuery