// API URLs
const commentsUrl = 'http://127.0.0.1:8000/api/comments/';
const commentPostUrl = 'http://127.0.0.1:8000/api/add_comments/';

// elements
const commentsList = document.getElementById('comments');
const commentForm = document.getElementById('comment-form');
const commentSubmit = document.getElementById('comment-submit');
const commentBody = document.getElementById('comment-body');

// Function to check authentication status
function checkAuth() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        const userData = parseJwt(accessToken);
        const username = userData.username;

        // Show/Hide navbar links based on authentication
        //loginLink.style.display = 'none';
        //signupLink.style.display = 'none';
        //logoutLink.style.display = 'block';

        // Redirect to home if on login or signup pages
        if (window.location.pathname === 'login.html' || window.location.pathname === 'signup.html') {
            window.location.href = 'index.html';
        }
    } else {
        //loginLink.style.display = 'block';
        //signupLink.style.display = 'block';
        //logoutLink.style.display = 'none';
    }
}

// Handle logout
//if (logoutLink) {
//    logoutLink.addEventListener('click', function (event) {
//        event.preventDefault();
//        localStorage.removeItem('access_token');
//        localStorage.removeItem('refresh_token');
//        window.location.href = 'login.html';
//    });
//}

// Check authentication status on page load
checkAuth();

// Refresh token every 4 minutes (240000 milliseconds)
setInterval(refreshToken, 240000);

const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".navList")

menu.onclick = () => {
    menu.classList.toggle("bx-x")
    navList.classList.toggle("open")
}


const animation = ScrollReveal({
    distance: "65px",
    duration: 2600,
    delay: 450,
    reset: true,
});
animation.reveal(".home", { delay: 200, origin: "left" });
animation.reveal(".image", { delay: 200, origin: "right" });
animation.reveal(".conceptsText", { delay: 200, origin: "left" });
animation.reveal(".container_img", { delay: 200, origin: "right" });
animation.reveal(".cards_services", { delay: 200, origin: "top" });


function displaySolution() {
    const selectBox = document.getElementById('issue-select');
    const solutionDiv = document.getElementById('solution');
    const selectedValue = selectBox.value;

    let solution = '';

    switch (selectedValue) {
        case 'depression':
            solution = ' It affects your daily life, making it difficult to function. If youre struggling with depression, recognize that its not your fault and you dont have to go through it alone. Reach out to a trusted person and seek professional help. Developing healthy routines, such as regular exercise, sleep, and mindfulness, can also help manage symptoms. Remember, recovery is possible with the right support. For more resources, visit the National Institute of Mental Health or Mental Health America ';
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

// Load comments
function loadComments() {
    fetch(commentsUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    })
        .then(response => response.json())
        .then(data => {
            commentsList.innerHTML = '';
            data.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment');
                commentItem.innerHTML = `<strong>${comment.username}</strong>: ${comment.body}`;
                commentsList.appendChild(commentItem);
            });
        })
        .catch(error => {
            console.error('Error loading comments: ', error);
        });
}

if (commentSubmit) {
    commentSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        const body = commentBody.value;

        fetch(commentPostUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: body
            })
        })
            .then(response => response.json())
            .then(data => {
                commentBody.value = '';
                loadComments();
            })
            .catch(error => {
                console.error('Error ', error);
            })
    })
}

loadComments();