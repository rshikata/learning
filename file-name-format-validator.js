class ValidateFormat {
  // ファイル、ディレクトリの名前に指定できない文字が含まれていないかチェック
  // 指定できない文字が含まれていたらtrueを返す。
  validateNameFormat(name) {
    const pattern = /[\\\/:\*\?\"<>\|]/;
    return pattern.test(name);
  }
}
