document.uploadJson.action = '/json/' + localStorage.token

function logOut(event) {
	localStorage.removeItem('token')
	window.location.replace("/")
}