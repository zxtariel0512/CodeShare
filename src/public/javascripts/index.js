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
            })
        }
    })
    req.send();
}



document.addEventListener('DOMContentLoaded', main);