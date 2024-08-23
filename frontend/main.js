const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".navList")

menu.onclick =() => {
    menu.classList.toggle("bx-x")
    navList.classList.toggle("open")
}


const animation = ScrollReveal({
    distance: "65px",
    duration: 2600,
    delay: 450,
    reset: true,
});
animation.reveal(".home",{delay:200,origin:"left"});
animation.reveal(".image",{delay:200,origin:"right"});
animation.reveal(".conceptsText",{delay:200,origin:"left"});
animation.reveal(".container_img",{delay:200,origin:"right"});
animation.reveal(".cards_services",{delay:200,origin:"top"});


function displaySolution() {
    const selectBox = document.getElementById('issue-select');
    const solutionDiv = document.getElementById('solution');
    const selectedValue = selectBox.value;

    let solution = '';

    switch (selectedValue) {
        case 'depression':
            solution = ' It affects your daily life, making it difficult to function. If youre struggling with depression, recognize that its not your fault and you dont have to go through it alone. Reach out to a trusted person and seek professional help. Developing healthy routines, such as regular exercise, sleep, and mindfulness, can also help manage symptoms. Remember, recovery is possible with the right support. For more resources, visit the National Institute of Mental Health or Mental Health America ' ;
            break;
        case 'stress':
            solution = ' If youre dealing with stress, its important to identify the sources and take steps to manage them. Practice relaxation techniques like deep breathing, meditation, or exercise to help reduce tension. Prioritize self-care and seek support from friends, family, or a professional if needed. Remember, managing stress is essential for your well-being. For more guidance, visit the American Psychological Association or Stress.org.';
            break;
        case 'bullying':
            solution = 'Bullying is a serious issue that can take many forms, including physical, verbal, social, and cyberbullying. It leads to feelings of isolation, fear, and low self-esteem. If yous crucial to recognize the situation, talk to someone you trust, and document the incidents. Avoid retaliation and focus on building a support network. Know your rights and consider seeking help from a mental health professional to develop coping strategies. Remember, bullying reflects the bully’s issues, not yours, and you have the power to overcome it. ';
            break;
        default:
            solution = '';
            break;
    }

    solutionDiv.textContent = solution;
}
//comment section
document.addEventListener('DOMContentLoaded', () => {
    loadComments();

    const form = document.getElementById('comment-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addComment();
    });
});

function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const comments = getCommentsFromStorage();
        comments.push({ comment: commentText });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = '';
        displayComments();
    }
}

function loadComments() {
    displayComments();
}

function displayComments() {
    const commentsContainer = document.getElementById('comments');
    const comments = getCommentsFromStorage();
    
    commentsContainer.innerHTML = '';
    comments.forEach(({ comment }, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p>${comment}</p>`;
        commentsContainer.appendChild(commentDiv);
    });
}

function getCommentsFromStorage() {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

