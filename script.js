function getInput() {
    const input = document.getElementById('input').value.trim();
    if (!input) {
        alert('Please enter some data first!');
        return null;
    }
    // Split by comma and trim whitespace from each item
    return input.split(',').map(item => item.trim());
}

function displayOutput(data) {
    const output = document.getElementById('output');
    output.textContent = data.join(', ');
}

function sortAscending() {
    const data = getInput();
    if (!data) return;
    
    // Try to sort numerically first
    const sorted = data.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        return a.localeCompare(b);
    });
    
    displayOutput(sorted);
}

function sortDescending() {
    const data = getInput();
    if (!data) return;
    
    // Try to sort numerically first, then reverse
    const sorted = data.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        if (!isNaN(numA) && !isNaN(numB)) {
            return numB - numA;
        }
        return b.localeCompare(a);
    });
    
    displayOutput(sorted);
}

function sortAlphabetically() {
    const data = getInput();
    if (!data) return;
    
    const sorted = data.sort((a, b) => a.localeCompare(b));
    displayOutput(sorted);
}

function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').textContent = '';
}
