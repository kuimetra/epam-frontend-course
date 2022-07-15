function visitLink(path) {
    const value = localStorage.getItem(path) ? +localStorage.getItem(path) + 1 : 1;
    localStorage.setItem(path, value.toString());
}

function viewResults() {
    const totalPages = 3;
    const div = document.createElement('div'), ul = document.createElement('ul');
    ul.setAttribute('id', 'site_visits');
    div.appendChild(ul);
    document.getElementById('content').appendChild(div);
    let list = '';
    for (let i = 1; i <= totalPages; i++) {
        const value = localStorage.getItem('Page' + i) === null ? 0 : +localStorage.getItem('Page' + i);
        list += `<li>You visited Page${i} ${value} time(s)</li>`;
    }
    document.getElementById('site_visits').innerHTML = list;
    localStorage.clear();
}