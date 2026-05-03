const http = require("http");

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>DevOps Articles</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #333; }
    .article { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
    input, textarea { width: 100%; margin: 5px 0; padding: 8px; }
    button { padding: 10px; background: #007bff; color: white; border: none; }
  </style>
</head>
<body>

<h1>📚 DevOps Articles</h1>

<div id="articles">Loading...</div>

<h2>Add Article</h2>
<input id="title" placeholder="Title" />
<textarea id="content" placeholder="Content"></textarea>
<button onclick="addArticle()">Add</button>

<script>
async function loadArticles() {
  const res = await fetch('/api/articles');
  const data = await res.json();

  document.getElementById('articles').innerHTML =
    data.map(a => \`
      <div class="article">
        <h3>\${a.title}</h3>
        <p>\${a.content}</p>
      </div>
    \`).join('');
}

async function addArticle() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  loadArticles();
}

loadArticles();
</script>

</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(3000, () => console.log("Frontend running"));