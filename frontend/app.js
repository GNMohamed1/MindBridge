function displaySolution() {
    const selectBox = document.getElementById('issue-select');
    const solutionDiv = document.getElementById('solution');
    const selectedValue = selectBox.value;

    let solution = '';

    switch (selectedValue) {
        case 'depression':
            solution = 'Consider talking to a mental health professional for personalized support.';
            break;
        case 'stress':
            solution = 'Practice mindfulness techniques like deep breathing or meditation to manage stress.';
            break;
        case 'bullying':
            solution = 'Report the behavior to a trusted authority or counselor to address the issue.';
            break;
        default:
            solution = '';
            break;
    }

    solutionDiv.textContent = solution;
}
