async function editCommentHandler(e) {
    e.preventDefault();

    const comments_text = document.querySelector('textarea').value.trim();
   
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    console.log(comments_text);

    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({  
        
            comments_text           
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/');
    } else { 
        alert(response.statusText);
    }
}

document.querySelector('#save').addEventListener('click', editCommentHandler);
