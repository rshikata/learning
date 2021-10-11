
// 必要なモジュールを読み込む
const fs = require('fs');               // fs : ファイル入出力を扱う
const archiver = require('archiver');   // アーカイブ生成用

/*
 _dirname : 現在のディレクトリのパス
*/
//console.log(__dirname );

const output = fs.createWriteStream(_dirname + '/example.zip');
const archive = archiver('zip',{
    zlib: {level: 9 }
})

output.on('close', function(){
    
});

output.on('end', function(){
    
});

archive.pipe(output);   // 戻り値： 宛先ストリーム

archive.globe('*.txt', {})
archive.finalize();     // ファイルを圧縮