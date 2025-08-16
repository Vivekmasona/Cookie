import express from "express";
import { exec } from "child_process";
import path from "path";

const app = express();

app.get("/insta", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url param");

  const cookiesPath = path.resolve("./cookies.txt"); // cookies file
  
  // Absolute path to yt-dlp
  const ytDlpPath = "/usr/bin/yt-dlp";

  exec(`${ytDlpPath} --cookies ${cookiesPath} -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send(stderr || "Failed to fetch video");
    }
    res.json({ url: stdout.trim() });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
