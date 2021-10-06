async function deleteCommentHandler(e){
    
    e.preventDefault();

    const comments_text = document.querySelector('textarea').value.trim();
    console.log(comments_text)
   
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch (`/api/comments/${id}`, {
        method: 'DELETE',
        comments_text 
    })
    if (response.ok) {
        document.location.replace('/');
    } else {     
        console.log(response.status)
        // alert(response.statusText);
    }
}

// document.querySelector('#delete-comment').addEventListener('click', deleteCommentHandler); 

// fixes NULL by executing after the DOM fully loads
var el = document.querySelector('#delete-comment');
if (el) {
	el.addEventListener('click', deleteCommentHandler, false);
}