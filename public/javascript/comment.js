async function commentsFormHandler(e) {
	e.preventDefault();
	const comments_text = document.querySelector('textarea[name="comment-body"]').value.trim();
	const posts_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	  ];
	if (comments_text) {
		const response = await fetch('/api/comments/', {
			method: 'POST',
			body: JSON.stringify({	
				posts_id,	
				comments_text	 		   
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
}  


document.querySelector('#save-comment').addEventListener('click', commentsFormHandler);
