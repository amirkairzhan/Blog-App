const posts = [];
const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const titleInputNode = document.getElementById('titleInput');
const textInputNode = document.getElementById('textInput');
const postButtonNode = document.getElementById('postButton');
const postsNode = document.getElementById('js-posts');
const validationMessage = document.getElementById('validationMessage');

postButtonNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
});

titleInputNode.addEventListener('input', validation);

textInputNode.addEventListener('input', validation);

function validation() {
    const titleLength = titleInputNode.value.length;
    const textLength = textInputNode.value.length;

    if (titleLength > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = 
        `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов.
        Количество символов: ${titleLength}`;
        validationMessage.classList.remove('validationMessage_hidden');
        return;
    } else {
        validationMessage.classList.add('validationMessage_hidden');
    }

    if (textLength > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = 
        `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов.
        Количество символов: ${textLength}`;
        validationMessage.classList.remove('validationMessage_hidden');
        return;
    } else {
        validationMessage.classList.add('validationMessage_hidden');
    }
}

function getPostFromUser() {
    const title = titleInputNode.value;
    const text = textInputNode.value;

    return {
        title: title,
        text: text,
    };
}

function addPost({ title, text }) {
    const postTime = new Date();
    const time = postTime.toLocaleString();

    posts.push({
        time,
        title,
        text,
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class="post">
                <p class="post__time">${post.time}</p>
                <p class="post__title">${post.title}</p>
                <p class="post__text">${post.text}</p>
            </div>
        `;
    });

    postsNode.innerHTML = postsHTML;
}
