const goLinks = {
	// settings
	'add': 'https://github.com/GetOutSports/LiteLinker/edit/main/index.js',
	'new': 'add',
	'edit': 'add',
	// socials
	'insta': 'https://www.instagram.com/mi.grlt/',
	'engineering-fte-notes': 'https://docs.google.com/document/d/1IfcSZ0mmEuGtT4KDtmK0vrPJ5sEQniERG01yIteAKU8/edit?usp=sharing',
    	'instagram': 'insta',
	'linkedin': 'https://www.linkedin.com/in/michelgrolet/',
	'ln': 'linkedin',
	'bc': 'https://www.getout.sport/',
	'dashboard': 'https://sites.google.com/getout.sport/portal/home',
};

function redirect() {
    const basePath = 'go'; // repository name
    let path = window.location.pathname.substr(1); // get the part after the initial slash

    if (path === 'links') return; // Prevent redirect on /links

    if (path.startsWith(basePath)) {
        path = path.substr(basePath.length + 1); // +1 to account for the slash
    }

    const redirectURL = goLinks[path];
    if (redirectURL) {
        window.location.href = redirectURL;
    } else {
        window.location.href = `https://getout.sport/404`;
    }
}

function generateLinksPage() {
    let html = '<!DOCTYPE html><html><head><title>Go Links</title></head><body>';
    html += '<h1>Go Links</h1><ul>';

    for (const [key, url] of Object.entries(goLinks)) {
        html += `<li><a href="${url}">${key}</a></li>`;
    }

    html += '</ul></body></html>';
    return html;
}

const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/links') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(generateLinksPage());
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}).listen(80, () => {
    console.log('Server is running at http://go.getout.sport/');
});

// Call redirect function on page load
redirect();
