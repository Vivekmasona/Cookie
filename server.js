import express from "express";
import { exec } from "child_process";
import fs from "fs";
import axios from "axios";

const app = express();

app.get("/insta", async (req, res) => {
  const url = req.query.url as string;

  // 🔑 Step 1: Cookies load karo (pehle se saved cookies.txt)
  const cookiesPath = "./cookies.txt";
  if (!fs.existsSync(cookiesPath)) {
    return res.status(500).send("Cookies file missing. Please login once.");
  }

  // 🔑 Step 2: yt-dlp run karo with cookies
  exec(
    `yt-dlp --cookies ${cookiesPath} -g "${url}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        return res.status(500).send("Error fetching video");
      }
      res.send({ url: stdout.trim() });
    }
  );
});

app.listen(3000, () => console.log("Server running"));
