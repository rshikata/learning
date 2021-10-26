// 必要なモジュールを読み込む
const fs = require("fs"); // fs : ファイルシステムモジュール
const archiver = require("archiver"); // archiver: 圧縮するためのarchiverモジュール
const unzipper = require("unzipper");

module.exports = class ZipFileArchiver {
  create(fileName, dirName) {
    try {
      fs.statSync(`${__dirname}/${dirName}`);

      const output = fs.createWriteStream(`${__dirname}/${fileName}.zip`);
      const archive = archiver("zip", { zlib: { level: 9 } });

      // 'close': ファイルストリームが閉じられたときに発生（圧縮完了）
      output.on("close", () => {
        console.log("ファイルの圧縮が完了しました。");
      });

      archive.pipe(output); // 読み込みストリームから書き込みストリームへ接続
      archive.glob("**", { cwd: dirName });
      archive.finalize(); // ファイルを圧縮
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("指定のディレクトリが存在しません。");
      } else {
        console.log(e.message);
      }
      process.exit(1);
    }
  }

  unzip(unzipFileName, zipFileName) {
    try {
      // 指定のzipファイルが存在するかチェック
      fs.statSync(`${__dirname}/${zipFileName}.zip`);

      const output = fs.createReadStream(`${__dirname}/${zipFileName}.zip`);
      output.pipe(unzipper.Extract({ path: `${__dirname}/${unzipFileName}/` }));

      // 'close': ファイルストリームが閉じられたときに発生
      output.on("close", () => {
        console.log("ファイルの解凍が完了しました。");
      });
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("指定のzipファイルが存在しません。");
      } else {
        console.log(e.message);
      }
      process.exit(1);
    }
  }
};
