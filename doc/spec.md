## 記号付加系のメソッドではパターンを囲む
パターンの後ろに`+`などの記号を付加するメソッド(manyやoption)では、
基本的に内側のパターンを`(?:)`で囲まなくてはならない。

また、内側のパターンが1文字かつ記号文字ではない場合は`(?:)`で囲んではならない。

その他のタイミングで`(?:)`で囲む処理は不要。
