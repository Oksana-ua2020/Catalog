function visitLink(path) {
	let visitN = localStorage.getItem(path);
	if (visitN === null) {
		visitN = 1;
	} else {
		++visitN;
	}
	localStorage.setItem(path, visitN);
}

function viewResults() {
	let textVisited;

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		let contentElement = document.getElementById('content');
		textVisited = `You visited ${key} ${localStorage.getItem(key)} time(s)`;
		let liElement = document.createElement('li');
		liElement.className = 'ml-3';
		liElement.innerHTML = textVisited;
		contentElement.append(liElement);
	}

	localStorage.clear();
}
