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
        // document.location.replace('/');
        GoBackWithRefresh();
    } else { 
        alert(response.statusText);
    }
}
// send user back and refresh page load if response.ok above
function GoBackWithRefresh(event) {
    if ('referrer' in document) {
        window.location = document.referrer;
        /* OR */
        //location.replace(document.referrer);
    } else {
        window.history.back();
    }
}

document.querySelector('#save').addEventListener('click', editCommentHandler);
