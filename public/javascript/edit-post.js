async function editFormHandler(e) {
    e.preventDefault();

    const title = document.querySelector('input[name$="title"]').value.trim();
    const post_text = document.querySelector('textarea').value.trim();
   
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    console.log(post_text);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        
            title,
            post_text
           
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else { 
        alert(response.statusText);
    }
}

document.querySelector('#save').addEventListener('click', editFormHandler);
