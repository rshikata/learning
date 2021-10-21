// 必要なモジュールを読み込む
const fs = require("fs"); // fs : ファイルシステムモジュール
const archiver = require("archiver"); // archiver: 圧縮するためのarchiverモジュール

// コンソール入力チェック
const args = process.argv.length;
if (args != 3) {
  console.log("コマンドの入力が不正です。");
  console.log("Usage: npm run archive <出力ファイル名>");
  process.exit(1);
}

const output = fs.createWriteStream("${__dirname}/${this.fileName}.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

// 'close': ファイルストリームが閉じられたときに発生（圧縮完了）
output.on("close", function () {
  console.log("ファイルの圧縮が完了しました。");
});

archive.pipe(output); // 読み込みストリームから書き込みストリームへ接続
archive.glob("*.txt", { cwd: __dirname }); // グローブパターン（ファイルパス）に一致する複数ファイルを追加
//archive.glob("*", { cwd: __dirname }); // グローブパターン（ファイルパス）に一致する複数ファイルを追加

archive.finalize(); // ファイルを圧縮
