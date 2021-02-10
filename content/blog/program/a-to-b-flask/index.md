---
title: "A to Bな変換系WebアプリをFlaskで作ろう！ゼロから…"
date: "2020/11"
description: "Python,Flask"
tags: ["program"]
# thumbnail: ./assets/default.png
---

# 最初に

Flask を理解するために奮闘した記事です。  
ここ間違ってるよ、こう解釈すると良いよなどのアドバイスがあればコメントいただけると無茶苦茶嬉しいです。  
出来上がったものがこちらになります。  
https://neutrino-converter.herokuapp.com/  
では、始めます。

# 概要

- A to B の形で**文字列を変換する**系の Web アプリを制作する
- NEUTRINO で作業するときに文字にスペースを入れる作業がめんどくさいので、これを利用してめんどくさくなくす

![127.0.0.1_5000_.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/5209e84d-6169-00a7-efd4-a67896131747.png)

# 第一部　「Flask を準備する」

使用する言語は僕がそれしか使えないので Python です。  
Flask というモジュールを使用しますが、実はこれが初体験です。  
1 から手順を追って説明していきましょう。

## pip で Flask をインストール

今回の開発には`pipenv`を使用ましたが、本記事は`pip`で説明します。  
以下コマンドを実行して Flask を導入します。

```python
pip install Flask
```

## ディレクトリを準備する

- `project`のディレクトリに`app`,`models`フォルダを作成します。
- `models`フォルダ内に`__init__.py`
- `app`フォルダ内に`templates`,`static`フォルダを作成します。
- `app`フォルダ内に`app.py`を作成します。
- `project`ディレクトリに`run.py`を作成します。

気がつくとこうなってると思います。

```
project
 ├app/
 │ ├templates/
 │ ├static/
 │ └app.py
 ├models/
 │ └__init__.py
 └run.py
```

## html を用意する

`app/templates`フォルダに`index.html`を用意します。  
だいたい中身はこんな感じとなっています。  
これが**出力されるページのモトとなります。**

```html:tltle=index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Musescore流し込み用文字変換</title>
    </head>
    <body>
        <h1>ここはindex.htmlだよ！</h1>
    </body>
</html>
```

## Python ファイルを用意する

先程作った`〜.py`の中身を組み立てていきます。

### run.py

サーバーを立ち上げる際に実行します。  
単純に app を呼び出して run する、という書き方で。

```python:title=run.py
from app.app import app

if __name__ == "__main__":
    app.run()
```

### app.py

Web アプリの根幹となる部分です。  
とりあえず`Hello World.`を表示させときましょう。

```python:title=app.py
from flask import Flask, render_template, request

# Flaskオブジェクトの生成
app = Flask(__name__)

@app.route('/')
def index():
    # 単純に文字列を表示するだけ
    return 'hello world.'


# 〜/index にアクセスがあった場合、index.htmlを描写する
@app.route('/index')
def post():
    return render_template('index.html')
```

中身の解説については後ほど行います。  
とりあえずこれで準備が整いました。

# 第二部　「とりあえず実行してみよう」

最小構成が出来上がりました。  
ではこの構成で一度サーバーを立ち上げてみましょう。  
立ち上げ方は、**flask が実行できる環境で**`run.py`を実行する、です。

```
python run.py
```

実行するとターミナルにいろいろ文字が出てきますが、注視する点はこれです。

```
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

表示されている URL を開くと、このような画面が出てくるはずです。

![スクリーンショット 2020-11-03 2.04.56.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/ccfe9ef6-c457-c5d9-95eb-3e2b72e7020b.png)

この画面と Python コードを見比べてみましょう。

```python:title=app.py
@app.route('/')
def index():
    return 'Hello World'
```

このコードの意味は以下の通りとなります。

- `/`、つまり`http://127.0.0.1:5000/`にアクセスすると関数を呼び出す。
- 関数では単純に、文字列`Hello World`が返されているだけ。
- この関数の返り値である`Hello World`がページに反映される。

といった感じです、なんとなく理解はできましたでしょうか？

確か、こういったコードも入力しましたよね。

```python:title=app.py
# 〜/index にアクセスがあった場合、index.htmlを描写する
@app.route('/index')
def post():
    return render_template('index.html')
```

このコードの意味は以下の通りとなります。

- `/index`、つまり`http://127.0.0.1:5000/index`にアクセスすると関数を呼び出す。
- 関数では、render_template('index.html')が返されている。
- `render`…描写する
- `template`…テンプレート
- つまり、`render_template('index.html')`は、**テンプレートとして`index.html`を描写する**といった意味です。
- 即ち、`http://127.0.0.1:5000/index`にアクセスすると、`index.html`が表示されます。

といった感じです。  
なんとな〜く、仕組みが理解できてきたと思います。  
なんとなくで良いのです、僕も詳しい意味はわからないので…

# 第三部　「ページを作っていこう」

## おさらい

今回作りたいのはこんなページです。

![127.0.0.1_5000_.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/5209e84d-6169-00a7-efd4-a67896131747.png)

このページに必要な要素を組んでいきましょう。

## index.html を組む

さっきまで触っていた html は普通の html でしたが、ここから少し違った html の書き方をします。

```html:index.html
<!DOCTYPE html>
<html>
<head>
    <title>Musescore流し込み用文字変換</title>
</head>
<body>
    <!-- form -->
    <form action="/" method="POST">
        <textarea name="before" rows="4" cols="40">ここにテキストを入れてね</textarea>
        <input type="submit" value="変換">
        {% if body %}
        <textarea name="after" rows="4">{{body}}</textarea>
        {% else %}
        <textarea name="after" rows="4">ボタンを押すとこっちに出力されるよ</textarea>
        {% endif %}
    </form>
    <!-- form -->
</body>
</html>
```

見慣れない文字が出てきましたね、順を追って説明しましょう。

- `{% if A %}`,`{% endif %}`に挟まれた html は、条件 A を満たさないと表示されない。
  > これの書き方がちょっとよくわからないんですけども、Web アプリ詳しい方いたら解説いただきたいです…
- Flask 側から`body`という要素を受け取ると、`{{body}}`にそれが挿入される。

といった感じです、プログラミングかじったことあるならば見慣れたような気がしますね。
では、以下の点に注目しましょう。

> Flask 側から`body`という要素を受け取ると、`{{body}}`にそれが挿入される。

これはどういった感じなのでしょうか？  
実際に Flask 側、から`body`という要素を渡す`app.py`がこちらになります。

```python:title=app.py
@app.route('/', methods=['post'])
def post():
    body = 'hoge'
    return render_template('index.html', body=body)
```

簡単な話ですね、返り値の引数に`body`を用意してあげればいいのです。  
逆に、`html側`から`Flask側`に要素を渡す際はこうなります。

```html:index.html
<form action="/" method="POST">
    <textarea name="before" rows="4" cols="40">ここにテキストを入れてね</textarea>
    <input type="submit" value="変換">
</form>
```

```python:title=app.py
body = request.form['before']
```

- `POSTするform`を組み、このフォームを実行するとアクションが起こるページを`action`で指定します。
- `textarea`に`name="before"`を設定します。
- `input`に`type="submit"`を設定します。
- この状態でボタンを押すと、**Flask 側で指定した要素を html から取得した**、という形でページが表示されます。

つまり、

これが
![スクリーンショット 2020-11-03 2.35.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/7a1a22bf-6ebd-7f0e-62a6-e4d66f939f9e.png)

こうなります
![スクリーンショット 2020-11-03 2.36.48.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/e3760fe6-8c2a-4f01-ccb2-d5ce5f9f77f5.png)

…おや、なんか手順がすっ飛んでますね。  
すっとんだ手順について追っていきましょう。

# 第四部　「文字列を変換する機構を作る」

そうです、文字列をどのように変換したかがすっ飛んでいます。

## 自作モジュールは models フォルダへ入れる

自作のモジュールを Flask で使用する場合、`models`フォルダにまとめておきましょう。  
フォルダの中身はこんな感じにしておきます。

```
models/
 ├__init__.py
 └convert.py
```

`__init__.py`を置くことで、models から import できるようにします。

> 参考: [Python 3 でのファイルの import のしかたまとめ \- Qiita](https://qiita.com/karadaharu/items/37403e6e82ae4417d1b3)

それでは、`convert.py`をいじっていきましょう。

## 正規表現で文字列を変換する

今回は正規表現で攻めていきます。  
各々関数にまとめたかったのですが、正直行数節約にもならなそうだったので一つにまとめちゃいました。

手順を説明するとこういった感じです。

- `(.)`で文字列を検索し、`\1 `で文字列に変更を加えないまま、スペースを後方に配置する。
- `\s(ゃ|ゅ|ょ|〜)`で` 拗音`となっている文字列を検索し、余分なスペースを削除する。
  > これについてもっとスマートな方法がある気がするのですが、知ってたら教えてください。
- `\s{2,}`で 2 つ以上連続しているスペースを検索し、余分なスペースを削除する。

```python:title=convert.py
import re

def convert(arg: str):
    pattern_before = r'(.)'
    pattern_after = r'\1 '
    s = arg
    s = re.sub(pattern_before, pattern_after, s)

    pattern_before = r'\s(ゃ|ゅ|ょ|ぁ|ぃ|ぅ|ぇ|ぉ|ャ|ュ|ョ|ァ|ィ|ゥ|ェ|ォ)'
    pattern_after = r'\1'
    s = re.sub(pattern_before, pattern_after, s)

    pattern_before = r'\s{2,}'
    pattern_after = r' '
    s = re.sub(pattern_before, pattern_after, s)

    return s
```

## convert.py を app.py で呼び出す

それでは、`app.py`から`convert.py`を呼び出して使用します。

```python:title= app.py
from models import convert

@app.route('/', methods=['post'])
def post():
    body = request.form['before']
    body = convert.convert(body)
    return render_template('index.html', body=body)
```

- `from models import convert`で convert を import する。
- フォームのボタンを押すと`before`要素を取得する
- `before`に対して`convert`関数を実行する。
- 変換した文字列`body`を描写する

といった感じです。

つまり、これでようやく

これが
![スクリーンショット 2020-11-03 2.35.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/7a1a22bf-6ebd-7f0e-62a6-e4d66f939f9e.png)

こうなる
![スクリーンショット 2020-11-03 2.36.48.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/e3760fe6-8c2a-4f01-ccb2-d5ce5f9f77f5.png)

とちゃんと説明できたわけです。

# 第五部　「機能ができたら次は外見」

このままだと見た目がちょっとダサいので、bootstrap を使って見た目を整えます。

`app`フォルダ内に`static`というフォルダがあります。  
ここに、CSS や JS などを入れていくわけです。  
今回、CSS のみを使用するので JS フォルダは用意しません。

```
app/
 └static/
   └css
     └bootstrap.min.css
```

といった構成でいきましょう。  
bootstrap をいじるわけですから…`index.html`ですよね。

```html:index.html
<!DOCTYPE html>
<html>

<head>
    <title>Musescore流し込み用文字変換</title>
    <link href="../static/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>
    <div class="jumbotron text-center">
        <h1 class="display-4">Lyrics -> Musescore</h1>
        <p class="lead">for NEUTRINO</p>
        <hr class="my-4">
        <p>NEUTRINO用にMusescoreを用意する際に流し込む歌詞にスペースを自動で追加するやつです。</p>
        <p>あいうえおきゃきゅきょ→あ い う え お きゃ きゅ きょ </p>
    </div>

    <!-- form -->
    <form action="/" method="POST">
        <div class="container-fluid">
            <div class="row justify-content-around form-group">
                <textarea class="col-11 col-md-4 form-control" name="before" rows="4" cols="40">ここにテキストを入れてね</textarea>
                <div class="col-md-1 my-md-auto">
                    <input type="submit" class="btn btn-primary btn-lg" value="変換">
                </div>
                {% if body %}
                <textarea class="col-11 col-md-4 form-control" name="after" rows="4">{{body}}</textarea>
                {% else %}
                <textarea class="col-11 col-md-4 form-control" name="after" rows="4">ボタンを押すとこっちに出力されるよ</textarea>
                {% endif %}
            </div>
        </div>
    </form>o

    <!-- form -->
    <footer class="text-muted ">
        <div class="container">
            <p class="text-center">
                連絡はこちらへ:<a href="https://twitter.com/_Sotono">@_Sotono</a>
            </p>
        </div>
    </footer>


</body>

</html>
```

これでようやく見た目がこうなりました。

![127.0.0.1_5000_.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/207577/5209e84d-6169-00a7-efd4-a67896131747.png)

長い旅路だった…  
あとはこれを公開するなり煮るなり焼くなりして自由に取り扱うことができます。

# 番外編　「詰まったところと解決策」

- Q.テストで`app.py`を実行してるのに、`No module named app`とか表示されて動かない…
- A.`run.py`を実行しましょう、全部解決します。

- Q.なんかよくわからない長文エラーを吐き出しています…`jinja2.exceptions.TemplateNotFound`とか末端に書いてある…
- A.`index.html`と`app.py`がうまく噛み合ってないかもしれないです、コードをちゃんと確認しましょう。存在しない要素呼び出してませんか？

# おわりに

長い文章になりました。  
今回これを作ったのは、趣味で作曲をしているときに「あーめんどくせ！！！」って思ったからです。  
NEUTRINO はすごい技術だと思うので今後の発展に期待しています。  
おわり。
