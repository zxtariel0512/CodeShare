// Write your client side Javascript code here
function main(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/code_snippets', true);
    req.addEventListener('error', function(){
        console.log(err);
    });
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            data = JSON.parse(req.responseText);
            const snippetsList = document.querySelector('main');
            data.forEach(function(s){
                const div = snippetsList.appendChild(document.createElement('div'));
                const code = document.createElement('pre');
                const title = document.createElement('h3');
                const comments = document.createElement('ul');
                title.textContent = s.title;
                code.textContent = s.code;
                s.comments.forEach(function(c){
                    comments.appendChild(document.createElement('li')).textContent = c;
                })
                div.appendChild(title);
                div.appendChild(code);
                div.appendChild(comments);
                const btn = document.createElement('button');
                btn.textContent = 'Comment';
                div.appendChild(btn);
                function commentHandler(event){
                    event.preventDefault();
                    
                }
                btn.addEventListener('click', commentHandler);
            })
        }
    })
    req.send();

    const postCodeBtn = document.querySelector('#btn-show-modal-code-snippet');
    const postModal = document.querySelector('#modal-code-snippet');
    function postHandler(evt){
        evt.preventDefault();
        postModal.classList.add('open');
        const post = document.querySelector('#create-code-snippet');
        function createCodeHandler(evt){
            evt.preventDefault();
            const title = document.querySelector('#code-snippet-title').value;
            const code = document.querySelector('#code-snippet-code').value;
            let reqPost = new XMLHttpRequest();
            reqPost.open('POST', 'http://localhost:3000/code_snippets', true);
            reqPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            reqPost.send('title=' + title + '&code=' + code);
            reqPost.addEventListener('load', function(){
                const snippetsList = document.querySelector('main');
                const div = snippetsList.appendChild(document.createElement('div'));
                const codeDiv = document.createElement('pre');
                const titleDiv = document.createElement('h3');
                const commentsDiv = document.createElement('ul');
                titleDiv.textContent = title;
                codeDiv.textContent = code;
                div.appendChild(titleDiv);
                div.appendChild(codeDiv);
                const commentBtn = document.createElement('button');
                commentBtn.textContent = 'Comment';
                div.appendChild(commentBtn);
                function commentHandler(event){
                    event.preventDefault();
                    
                }
                commentBtn.addEventListener('click', commentHandler);
                document.querySelector('#code-snippet-title').value = '';
                document.querySelector('#code-snippet-code').value = '';
                postModal.classList.remove('open');
            });
            reqPost.addEventListener('error', function(){
                console.log(err);
            })
        }
        post.addEventListener('click', createCodeHandler);
    }
    postCodeBtn.addEventListener('click', postHandler)
    const closeBtn = document.querySelector('.close');
    function closeHandler(evt){
        evt.preventDefault();
        document.querySelector('#code-snippet-title').value = '';
        document.querySelector('#code-snippet-code').value = '';
        postModal.classList.remove('open');
    }
    closeBtn.addEventListener('click', closeHandler);
}



document.addEventListener('DOMContentLoaded', main);