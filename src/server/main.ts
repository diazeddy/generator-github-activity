import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import fs from "fs";
import { exec } from "child_process"
import util from "util";
import JSZip from "jszip";

import { GIT_USERNAME, GIT_EMAIL } from "./constants";

const process = util.promisify(exec);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

const app = express();

app.use(bodyParser.json());

function addFolderToZip(zip: JSZip, folderPath: string, basePath: string) {
  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
      const filePath = `${folderPath}/${file}`;
      const fileStats = fs.statSync(filePath);

      if (fileStats.isFile()) {
          const fileContent = fs.readFileSync(filePath);
          const relativePath = filePath.replace(basePath, '');

          zip.file(relativePath, fileContent);
      } else if (fileStats.isDirectory()) {
          addFolderToZip(zip, filePath, basePath);
      }
  });
}


app.post("/api/generate", async (req: Request, res: Response) => {
  const {start, end, commits, frequency} = req.body;
  const startDate = new Date(start);
  const endDate = new Date(end);
  endDate.setDate(endDate.getDate() + 1);
  const folderName = `Project-${Date.now()}`;
  await mkdir(folderName);
  await process(`git init`, { cwd: folderName });
  await process(`git config --local user.name "${GIT_USERNAME}"`, { cwd: folderName });
  await process(`git config --local user.email "${GIT_EMAIL}"`, { cwd: folderName });
  for (let date = startDate; date.toISOString().slice(0, 10) !== endDate.toISOString().slice(0, 10); date.setDate(date.getDate() + 1)) {
    if (Math.floor(Math.random() * 100) > Number(frequency)) {
      continue;
    }
    for (let i = 0; i < Number(commits); i++) {
      const time = new Date(date);
      time.setHours(i + 10);
      await writeFile(`${folderName}/file-${Date.now()}`, "");
      await process(`git add .`, { cwd: folderName });
      await process(`set GIT_COMMITTER_DATE=${time.toISOString()} && git commit -m "add file" --date=${time.toISOString()}`, { cwd: folderName });
    }
  }
  const zip = new JSZip();
  addFolderToZip(zip, folderName, "");
  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream('archive.zip'))
        .on('finish', () => {
            console.log('Folder zipped successfully.');
            res.download(`archive.zip`, 'archive.zip', (err) => {
                if (err) {
                    res.status(500).send('Error downloading the zip file');
                }
                fs.unlinkSync('archive.zip');
            });
        });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
