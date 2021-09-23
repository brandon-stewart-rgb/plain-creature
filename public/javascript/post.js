//signup
async function postEntry(event) {
	event.preventDefault();

	const title = document.querySelector('#title').value;
	const post_text = document.querySelector('#post_text').value;

	const response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({
			title,
			post_text,
		}),
		headers: {
			'Content-type': 'application/json',
		},
	});
	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
}



// fixes NULL by executing after the DOM fully loads
var el = document.getElementById('save');
if (el) {
	el.addEventListener('click', postEntry, false);
}
