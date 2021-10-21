// コンソール入力チェック
const args = process.argv.length;
if (args !== 4) {
  console.log("コマンドの入力が不正です。");
  console.log("Usage: npm run archive <出力ファイル名> <圧縮対象ファイル名>");
  process.exit(1);
}

// ファイル、ディレクトリの名前に指定できない文字が含まれていないかチェック
const validator = new validateFormate();
if (
  validator.validateNameFormat(process.argv[2]) ||
  validator.validateNameFormat(process.argv[3])
) {
  console.log("名前に指定できない文字が含まれています。");
  process.exit(1);
}

// ファイル圧縮を実行
const file = new ZipFileArchiver();
file.createArchive(process.argv[2], process.argv[3]);
