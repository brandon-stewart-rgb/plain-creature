//signup
async function postEntry(event) {
	event.preventDefault();

	const title = document.querySelector('#title').value.trim();
	const post_text = document.querySelector('#text').value.trim();
	

	if (title && post_text) {
		const response = await fetch('/api/posts', {
			method: 'post',
			body: JSON.stringify({
				title,
				post_text,
				
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			
			alert(response.statusText);
		}
	}
}

document.getElementById('post-box').addEventListener('submit', postEntry);