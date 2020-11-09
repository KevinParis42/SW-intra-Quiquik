function login() {
	var logForm = document.querySelector('.form-signin')
	event.preventDefault()
	fetch('/', {
		method: 'POST',
		body: new FormData(logForm)
	})
	.then(res => res.text())
	.then(msg => {
		if (msg == 'Bad password' || msg == 'Bad mail') {
			document.querySelector('.alert').style.display = 'block'
		} else {
			document.querySelector('.alert').style.display = 'none'
			localStorage.setItem("token", msg)
			redirectUserPage()
		}
	})
}

function redirectUserPage() {
	var token = localStorage.getItem('token')
	console.log(token)
	if (token) {
		var decodedToken = JSON.parse(atob(token.split('.')[1]))
		var url = `/${decodedToken.pseudo}/${token}`
		fetch(url, {
			method: 'GET',
			redirect : 'follow'
		}).then(res => {
			window.location.href = res.url
		})
	}
}