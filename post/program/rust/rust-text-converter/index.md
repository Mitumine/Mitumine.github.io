---
title: Pythonerが、ゼロからRustで、Printとinputを使いたいの巻
date: "2021/02/"
description: "Rust"
tags: ["program", "Rust"]
thumbnail: 0.png
---

## 概要

- Python しかわからねえマンが
- さっき始めたばかりの Rust を使って
- プログラムを作る

## 材料を調達

- 確認用の`printin`を見ながら文字列を学ぶ
- 文字を入力させたいので``

## Print の仕組みから学ぼう

とりあえず前回の記事で`Hello World`はできたので、  
今回は`Print`を取り扱っていきます。

### とにかく変数を文字列として Print する

```rust:title:main.rs
fn main() {
    let text = "aaaa";
    println!("{}", text);
}

// aaaa
```

- `let ~`で変数を宣言
- `"{}", ~`という書き方。
  - 出力したいところに`{}`を置く。
  - それをあとから`~`で置き換えるイメージ

> 「一般的に `{} `はどんな引数であろうと自動的に置き換えられます。」  
> [フォーマットしてプリント \- Rust By Example 日本語版](https://doc.rust-jp.rs/rust-by-example-ja/hello/print.html)

### 文字列を改行したい

- 改行したい場合は`\n`を差し込めば改行される。

```rust:title:main.rs
fn main() {
    let text = "aa\naa";
    println!("{}", text);
}

// -----出力
// aa
// aa
// -----出力

```

- `"`と`";`の間であれば、実際に改行していてもにんし息されるらしい。
- この場合、インデントになっている**スペースも文字列に含まれる**ので取扱に注意が必要。

```rust:title:main.rs
fn main() {
    let text = "aa
    aa
aa";
    println!("{}", text);
}

// -----出力
// aa
//     aa
// aa
// -----出力

```

## input の初歩

Python の場合、こういう記述で一発で input ができます。  
便利ですね。

```python:title=main.py
s = input('文字列を入力してください >>>> ')
```

### Rust ではどう書くか

ところが、Rust では input が一発でできないみたいです。  
調べたらマクロ？というものを組む必要があるらしいんですが、  
**初学者が手つけたら死ぬな**と思ったので、おとなしく諸々を書いていきます。

```rust:title=main.rs
fn main() {
  println!("フォルダの名前は？\n>>>> ");
  let mut title = String::new();
  // 入力機構
  stdin().read_line(&mut title).ok().expect("Error");
  // 改行コードを抹消
  title = title.trim().to_string();
  println!("'{}'", title);
}
// -----出力
// フォルダの名前は？
// >>>>
// test(と入力)
// 'test'
// -----出力

```

- ミュータブルな変数を宣言して
- `std::io::stdin()`は`.read_line`を呼び出す前菜のようなものですかね
- `.read_line(&mut title)`で入力
- それを`title`にそれを書き込んで
- `ok()`で指差し確認、ヨシ！
- `expect()`で万が一だめなときでも、ヨシ！
- このままだと末端に改行コードが挿入されてしまう
- ので`trim()`して`to_string()`で整える(？)

…ってところでしょうか、あんまり良くわかっていません。  
マクロを書く書き方が主流みたいなので、  
慣れたらそっちのほうが良さげです。

### わかりやすくするために見た目を整えよう

ただ、このままだと

```
>>>>
test
'test'
```

という風に出力されてしまいます。
Python ライクに扱いたいので…

```
>>>> test
'test'
```

と出力したい…なにか方法ないのかな…  
**…あるじゃん。**

```rust:title=main.rs
use std::io::Write;

fn main() {
  print!("フォルダの名前は？\n>>>> ");
  std::io::stdout().flush().unwrap();
  let mut title = String::new();
  std::io::stdin().read_line(&mut title).ok().expect("Error");
  title = title.trim().to_string();
  println!("'{}'", title);
}
```

- `use std::io::Write;` は Python で言うところの`import ~`
- とにかく`Write`の中に`flush()`というものがあるということでよろしく
- `print!`を使うと改行コードが末尾に付加されずに済む
- ただ`flush()`を使わないと順番通りにいかないとのことなので入れておく(※)

> ※`flush()`がどういうものなのか、  
> 公式ドキュメント読んでもよくわからなかったので  
> 有志の方いたらコメントください…

これで理想通り

```
>>>> test
'test'
```

と出力されるようになりました。

## 関数

出力はうまくいきましたが、問題は**これを何度も書かなきゃいけない**ことです。
めんどくさいね…`fn main()`使ってるくらいだから関数化しちゃおうか。

ということでできました。

```rust:title=main.rs
use std::io;
use std::io::Write;

// inputを扱う関数、引数はない
fn input() -> String {
  print!(">>>> ");
  std::io::stdout().flush().unwrap();
  let mut word = String::new();
  io::stdin().read_line(&mut word).ok();
  return word.trim().to_string();
}

fn main() {
  println!("1？");
  let a = input();

  println!("2？");
  let b = input();

  println!("結果");
  println!("'{}'", a);
  println!("'{}'", b);

}

```

関数の考え方は Python と同じで良いようです。

```:title=出力
1？
>>>> aaaa
2？
>>>> bbbb
結果
'aaaa'
'bbbb'
```

## 参考

- [フォーマットしてプリント \- Rust By Example 日本語版](https://doc.rust-jp.rs/rust-by-example-ja/hello/print.html)
- [Rust で 100 本ノック: 標準入力からの文字入力と数値変換｜ぐは｜ note](https://note.com/densukeo/n/n1a803754b077)
- [【Rust】コンソールにて文字列を入力し、結果を print にて出力させる方法 \- Magidropack’s blog](https://magidropack.hatenablog.com/entry/2018/12/18/194442#chapter02)
- [Rust で print と read_line を 1 行にする方法 \- やってみる](http://ytyaru.hatenablog.com/entry/2020/07/26/000000)
- [文字列 \- Rust \| nju33](https://nju33.com/notes/rust/articles/%E6%96%87%E5%AD%97%E5%88%97#%E6%96%87%E5%AD%97%E5%88%97)
