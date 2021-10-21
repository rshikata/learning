// 必要なモジュールを読み込む
const fs = require("fs"); // fs : ファイルシステムモジュール
const archiver = require("archiver"); // archiver: 圧縮するためのarchiverモジュール

class ZipFileArchiver {
  createArchive(fileName, dirName) {
    try {
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
      console.log(e.message);
      process.exit(1);
    }
  }
}
