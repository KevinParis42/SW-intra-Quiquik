function createUser() {
	var logForm = document.getElementById('newUserForm')
	var form = new FormData(logForm)

	fetch('/admin/newUser', {
		method: 'POST',
		body: form
	})
	.then(res => window.alert(res.text()))
}
