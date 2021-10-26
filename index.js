const FileNameFormatValidator = require("./file-name-format-validator");
const ZipFileArchiver = require("./zip-file-archiver");

(() => {
  // コンソール入力チェック
  const args = process.argv.length;
  if (args !== 5) {
    console.log("コマンドの入力が不正です。");
    console.log(
      "Usage: npm run archive <出力ファイル名> <圧縮対象ファイル名/解凍ファイル> <圧縮(0)/解凍(1)>"
    );
    process.exit(1);
  }

  // ファイル、ディレクトリの名前に指定できない文字が含まれていないかチェック
  const validator = new FileNameFormatValidator();
  if (
    validator.validateNameFormat(process.argv[2]) ||
    validator.validateNameFormat(process.argv[3])
  ) {
    console.log("名前に指定できない文字が含まれています。");
    process.exit(1);
  }

  // ファイル圧縮、解凍を実行
  const archiver = new ZipFileArchiver();
  switch (process.argv[4]) {
    case "0":
      archiver.create(process.argv[2], process.argv[3]);
      break;
    case "1":
      archiver.unzip(process.argv[2], process.argv[3]);
      break;
    default:
      console.log("圧縮(0)/解凍(1)の指定が不正です。");
      break;
  }
})();
