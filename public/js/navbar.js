var token = localStorage.getItem('token')
var decodedToken = JSON.parse(atob(token.split('.')[1]))
document.getElementById('homeImg').href = `/${decodedToken.pseudo}/${token}`
document.getElementById('home').href = `/${decodedToken.pseudo}/${token}`
document.getElementById('userList').href = `/users/${token}`
document.getElementById('newUser').href = `/admin/newUser/${token}`

function logOut(event) {
	localStorage.removeItem('token')
	window.location.replace("/")
}