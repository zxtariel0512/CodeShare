// Write your client side Javascript code here
function main(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/code_snippets', true);
    req.addEventListener('error', function(){
        console.log(err);
    });  
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            let data = JSON.parse(req.responseText);
            const snippetsList = document.querySelector('main');
            data.forEach(function(s){
                const div = document.createElement('div');
                snippetsList.appendChild(div);
                // const div = snippetsList.appendChild(document.createElement('div'));
                const code = document.createElement('pre');
                const title = document.createElement('h3');
                const comments = document.createElement('ul');
                title.textContent = s.title;
                code.textContent = s.code;
                s.comments.forEach(function(c){
                    comments.appendChild(document.createElement('li')).textContent = c;
                })
                div.id = s._id;
                div.appendChild(title);
                div.appendChild(code);
                div.appendChild(comments);
                const btn = document.createElement('button');
                btn.id = 'comment' + s._id;
                btn.textContent = 'Comment';
                div.appendChild(btn);
                const commentModal = document.querySelector('#modal-comment');
                // commentModal.querySelector('.submit').id = 'submitComment' + div.id;   
                function commentHandler(event){
                    console.log('commenthandler');
                    const commentModal = document.querySelector('#modal-comment');
                    event.preventDefault();
                    commentModal.classList.add('open'); 
                    // commentModal.querySelector('#create-comment').id = 'submitComment' + div.id;
                    const submitBtn = document.querySelector('#create-comment');
                    let run = true;
                    function submitHandler(evt){
                        evt.preventDefault();
                        if(run){
                            const comment = document.querySelector('#comment-text').value;
                            const id = div.id;
                            console.log(id);
                            let reqComment = new XMLHttpRequest();
                            reqComment.open('POST', 'http://localhost:3000/code_snippets/' + id + '/comments', true);
                            reqComment.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                            reqComment.send('comment=' + comment + '&id=' + id);
                            reqComment.addEventListener('load', function(){
                                let newData = JSON.parse(reqComment.responseText);
                                // console.log(newData);
                                const oldList = div.querySelector('ul');
                                const newList = document.createElement('ul');
                                newData.docs.comments.forEach(function(c){
                                    newList.appendChild(document.createElement('li')).textContent = c;
                                })
                                div.replaceChild(newList, oldList);
                                // const commentList = document.querySelector('ul');
                                // commentList.appendChild()
                                document.querySelector('#comment-text').value = '';
                                document.querySelector('#code-snippet-id').value = '';
                                document.querySelector('#modal-comment').classList.remove('open');
                            })
                            reqComment.addEventListener('error', function(){
                                console.log(err);
                            })
                            run = false;
                        }
                    }
                    submitBtn.addEventListener('click', submitHandler);      
                }
                
                // cancelBtn.addEventListener('click', cancelHandler);
                btn.addEventListener('click', commentHandler); 
                

                document.querySelector('#code-snippet-id').value = div.id;
                
                    
                // function submitHandler(evt){
                //     evt.preventDefault();
                //     const comment = document.querySelector('#comment-text').value;
                //     const id = div.id;
                //     console.log(id);
                //     let reqComment = new XMLHttpRequest();
                //     reqComment.open('POST', 'http://localhost:3000/code_snippets/' + id + '/comments', true);
                //     reqComment.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                //     reqComment.send('comment=' + comment + '&id=' + id);
                //     reqComment.addEventListener('load', function(){
                //         let newData = JSON.parse(reqComment.responseText);
                //         // console.log(newData);
                //         const oldList = div.querySelector('ul');
                //         const newList = document.createElement('ul');
                //         newData.docs.comments.forEach(function(c){
                //             newList.appendChild(document.createElement('li')).textContent = c;
                //         })
                //         div.replaceChild(newList, oldList);
                //         // const commentList = document.querySelector('ul');
                //         // commentList.appendChild()
                //         document.querySelector('#comment-text').value = '';
                //         document.querySelector('#code-snippet-id').value = '';
                //         document.querySelector('#modal-comment').classList.remove('open');
                //     })
                //     reqComment.addEventListener('error', function(){
                //         console.log(err);
                //     })
                // }
                // submitBtn.addEventListener('click', submitHandler);
                const cancelBtn = document.querySelector('#modal-comment').querySelector('.close');
                function cancelHandler(evt){
                    document.querySelector('#comment-text').value = '';
                    document.querySelector('#code-snippet-id').value = '';
                    commentModal.classList.remove('open');
                }
                cancelBtn.addEventListener('click', cancelHandler);

            })

        }
    })
    req.send();

    const postCodeBtn = document.querySelector('#btn-show-modal-code-snippet');
    const postModal = document.querySelector('#modal-code-snippet');
    function postHandler(evt){
        evt.preventDefault();
        postModal.classList.add('open');
    }
    postCodeBtn.addEventListener('click', postHandler)
    function createCodeHandler(evt){
        const post = document.querySelector('#create-code-snippet');
        evt.preventDefault();
        const title = document.querySelector('#code-snippet-title').value;
        const code = document.querySelector('#code-snippet-code').value;
        let reqPost = new XMLHttpRequest();
        reqPost.open('POST', 'http://localhost:3000/code_snippets', true);
        reqPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        reqPost.send('title=' + title + '&code=' + code);
        reqPost.addEventListener('load', function(){
            const snippetsList = document.querySelector('main');
            const div = document.createElement('div');
            snippetsList.appendChild(div);
            const codeDiv = document.createElement('pre');
            const titleDiv = document.createElement('h3');
            const commentsDiv = document.createElement('ul');
            titleDiv.textContent = title;
            codeDiv.textContent = code;
            div.appendChild(titleDiv);
            div.appendChild(codeDiv);
            div.appendChild(commentsDiv);
            const commentBtn = document.createElement('button');
            commentBtn.textContent = 'Comment';
            div.appendChild(commentBtn);
            let data = JSON.parse(reqPost.responseText);
            div.id = data._id;
            
            function commentHandlerNew(event){
                const commentModal = document.querySelector('#modal-comment');
                event.preventDefault();
                commentModal.classList.add('open');
                const submitBtn = document.querySelector('#create-comment');
                let run = true;
                function submitHandlerNew(evt){
                    evt.preventDefault();
                    if(run){
                        const comment = document.querySelector('#comment-text').value;
                        const id = div.id;
                        console.log(id);
                        let reqCommentNew = new XMLHttpRequest();
                        reqCommentNew.open('POST', 'http://localhost:3000/code_snippets/' + id + '/comments', true);
                        reqCommentNew.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        reqCommentNew.send('comment=' + comment + '&id=' + id);
                        reqCommentNew.addEventListener('load', function(){
                            let newData = JSON.parse(reqCommentNew.responseText);
                            const oldList = div.querySelector('ul');
                            const newList = document.createElement('ul');
                            newData.docs.comments.forEach(function(c){
                                newList.appendChild(document.createElement('li')).textContent = c;
                            })
                            div.replaceChild(newList, oldList);
                            document.querySelector('#comment-text').value = '';
                            document.querySelector('#code-snippet-id').value = '';
                            commentModal.classList.remove('open');
                        })
                        reqCommentNew.addEventListener('error', function(){
                            console.log(err);
                        })
                        run = false;
                    }
                }
                submitBtn.addEventListener('click', submitHandlerNew);
            }
            commentBtn.addEventListener('click', commentHandlerNew);
            const commentModal = document.querySelector('#modal-comment');
            document.querySelector('#code-snippet-id').value = div.id;
            const cancelBtn = commentModal.querySelector('.close');
                function cancelHandler(evt){
                    document.querySelector('#comment-text').value = '';
                    document.querySelector('#code-snippet-id').value = '';
                    commentModal.classList.remove('open');
                }
            cancelBtn.addEventListener('click', cancelHandler);
            document.querySelector('#code-snippet-title').value = '';
            document.querySelector('#code-snippet-code').value = '';
            postModal.classList.remove('open');
        });
        reqPost.addEventListener('error', function(){
            console.log(err);
        })
    }
    const post = document.querySelector('#create-code-snippet');
    post.addEventListener('click', createCodeHandler);
    const closeBtn = postModal.querySelector('.close');
    function closeHandler(evt){
        evt.preventDefault();
        document.querySelector('#code-snippet-title').value = '';
        document.querySelector('#code-snippet-code').value = '';
        postModal.classList.remove('open');
    }
    closeBtn.addEventListener('click', closeHandler);
}



document.addEventListener('DOMContentLoaded', main);


// function main(){
//     const post = document.querySelector('#create-code-snippet');
//     let req = new XMLHttpRequest();
//     req.open('GET', 'http://localhost:3000/code_snippets', true);
//     req.addEventListener('error', function(){
//         console.log(err);
//     });
//     req.addEventListener('load', function(){
//         if(req.status >= 200 && req.status < 400){
//             data = JSON.parse(req.responseText);
//             const snippetsList = document.querySelector('main');
//             data.forEach(function(s){
//                 const div = snippetsList.appendChild(document.createElement('div'));
//                 const code = document.createElement('pre');
//                 const title = document.createElement('h3');
//                 const comments = document.createElement('ul');
//                 title.textContent = s.title;
//                 code.textContent = s.code;
//                 s.comments.forEach(function(c){
//                     comments.appendChild(document.createElement('li')).textContent = c;
//                 })
//                 div.appendChild(title);
//                 div.appendChild(code);
//                 div.appendChild(comments);
//                 const btn = document.createElement('button');
//                 btn.textContent = 'Comment';
//                 div.appendChild(btn);
//                 function commentHandler(event){
//                     event.preventDefault();
                    
//                 }
//                 btn.addEventListener('click', commentHandler);
//             })
//         }
//     })
//     req.send();

//     const postCodeBtn = document.querySelector('#btn-show-modal-code-snippet');
//     const postModal = document.querySelector('#modal-code-snippet');
//     function postHandler(evt){
//         evt.preventDefault();
//         postModal.classList.add('open');
//         // const post = document.querySelector('#create-code-snippet');
//     }
//     postCodeBtn.addEventListener('click', postHandler);
//     function createCodeHandler(evt){
//         evt.preventDefault();
//         const title = document.querySelector('#code-snippet-title').value;
//         const code = document.querySelector('#code-snippet-code').value;
//         let reqPost = new XMLHttpRequest();
//         reqPost.open('POST', 'http://localhost:3000/code_snippets', true);
//         reqPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//         reqPost.send('title=' + title + '&code=' + code);
//         reqPost.addEventListener('load', function(){
//             const snippetsList = document.querySelector('main');
//             const div = snippetsList.appendChild(document.createElement('div'));
//             const codeDiv = document.createElement('pre');
//             const titleDiv = document.createElement('h3');
//             const commentsDiv = document.createElement('ul');
//             titleDiv.textContent = title;
//             codeDiv.textContent = code;
//             div.appendChild(titleDiv);
//             div.appendChild(codeDiv);
//             const commentBtn = document.createElement('button');
//             commentBtn.textContent = 'Comment';
//             div.appendChild(commentBtn);
//             function commentHandler(event){
//                 event.preventDefault();
                
//             }
//             commentBtn.addEventListener('click', commentHandler);
//             document.querySelector('#code-snippet-title').value = '';
//             document.querySelector('#code-snippet-code').value = '';
//             postModal.classList.remove('open');
//         });
//         reqPost.addEventListener('error', function(){
//             console.log(err);
//         })
//     }
//     post.addEventListener('click', createCodeHandler);
//     const closeBtn = document.querySelector('.close');
//     function closeHandler(evt){
//         evt.preventDefault();
//         document.querySelector('#code-snippet-title').value = '';
//         document.querySelector('#code-snippet-code').value = '';
//         postModal.classList.remove('open');
//     }
//     closeBtn.addEventListener('click', closeHandler);
// }



// document.addEventListener('DOMContentLoaded', main);