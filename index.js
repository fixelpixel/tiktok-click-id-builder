const express = require("express");
const app = express();
const port = Number(process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Generate Landing Page URL for Ads</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
  </head>
  <body class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-center mb-4">Generate Landing Page URL for Ads</h1>
    ${
      !req.query.result
        ? `
        <div class="w-full max-w-sm">
          <form class="bg-white p-6 rounded-lg shadow-lg" action="/" method="post">
            <h2 class="text-lg font-medium mb-4">Enter Your Landing Page URL</h2>
            <input class="border p-2 w-full mb-4" type="text" name="url">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mx-auto" type="submit">Generate Link</button>
          </form>
        </div>
        `
        : ""
    }
    ${
      req.query.result
        ? `
        <div class="mt-4 text-center">
          <h3 class="text-lg font-medium mb-2">Result:</h3>
          <p id="resultLink" class="text-gray-700 cursor-pointer" onclick="copyToClipboard('${req.query.result}')">${req.query.result}</p>
          <p class="text-sm text-gray-500">Click on the link to copy it to your clipboard and use it in your ads.</p>
        </div>
        <div id="copyConfirmation" class="fixed bottom-0 right-0 m-4 p-2 bg-green-500 text-white rounded-full invisible">Link copied!</div>
        <script>
          function copyToClipboard(text) {
            navigator.clipboard.writeText(text);
            document.getElementById("copyConfirmation").classList.remove("invisible");
            setTimeout(() => {
              document.getElementById("copyConfirmation").classList.add("invisible");
            }, 2000);
          }
        </script>
        `
        : ""
    }
  </body>
</html>
  `);
});

app.post("/", (req, res) => {
  const { url } = req.body;
  if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url)) {
    return res.send(`
      <html>
        <head>
          <title>Generate Landing Page URL for Ads</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
        </head>
        <body class="flex flex-col justify-center items-center h-screen">
          <h1 class="text-center mb-4">Generate Landing Page URL for Ads</h1>
          <div class="w-full max-w-sm">
            <form class="bg-white p-6 rounded-lg shadow-lg" action="/" method="post">
              <h2 class="text-lg font-medium mb-4">Enter Your Landing Page URL</h2>
              <input class="border p-2 w-full mb-4" type="text" name="url">            
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mx-auto" type="submit">Generate Link</button>
            </form>
          </div>
          <div class="mt-4 text-center">
            <h3 class="text-red-500 font-medium mb-2">Error:</h3>
            <p class="text-sm text-red-500">Please enter a valid URL</p>
          </div>
        </body>
      </html>
    `);
  }
  let result = url;
  if (url.includes("?")) {
    result += "&ttclid=__CLICKID__";
  } else {
    result += "?ttclid=__CLICKID__";
  }
  res.redirect(`/?result=${encodeURIComponent(result)}`);
});





app.listen(port, "127.0.0.1", () => {
  console.log(`App is running at http://localhost:${port}`);
});