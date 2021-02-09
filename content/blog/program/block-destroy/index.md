---
title: "Twitterのブロックを一斉に解除しようの巻"
date: "2021/10"
description: "Python,Twitter"
tags: ['program']
# thumbnail: assets/default.png
---

# 概要

- Twitter APIを利用して積もり積もったブロックを一斉に解除する

# Twitter、楽しんでますか？

どうも、2010年くらいからTwitterやってるけどアカウント一回消したので2013年からやってるみたいに見えるけど割と古参なツイッタラーSotonoです。  
Twitter、スマホの普及でインターネット人口が爆発的に増えてやってる人が無茶苦茶増えましたよね。  
…まあその分目につくアカウントも爆発的に増えたのでブロック機能も大活躍〜って感じなのですが…  

ところでこれは宣伝なんですけども、趣味で作っている音楽の新曲を発表しました。  
本筋とはちょっとしか関係ありませんが、どうぞ聴いてみてください。  

[ここを押すとYoutubeに飛びます](https://t.co/JecryTf2lX?amp=1)

# 嫌なものに蓋をする行為としてのブロック

僕は以前、**ワードで検索をかけて、引っかかったユーザーをすべてブロックする**というスクリプトを制作した経験があります。 \(記事にはしていませんが\)  

その目的は単純明快で、「 **見たくないものに蓋をしたかった** 」ということなんですね。  
ただ、こちらから蓋をすると向こうからも見えなくなるといったデメリットがブロック機能にはございまして、  
僕はこのスクリプトを使って**100万人弱のアカウントをブロック**してきました。[おふがお氏リスペクト](https://getnews.jp/archives/1452871/gate)かなにか？

嫌なワードをミュートすればいいじゃんって話なんですが、実はワードミュート、活用してます。  
じゃあなんでそんな数ブロックしたのかといいますと、「 **そんなことを言ってるやつは他のことを言わせてもロクなことを言わない** 」と思ったからなんですね。  

例えば話題Aが嫌いで、「そんな話題ききとうない！！」とワードミュートしてても、  
その人が話題Bを発言しても似たようなニュアンスのことが多いんですね。  
なので「話題A嫌じゃ！そんな事を言うやつは話題Bでも同じこと言う！！」とブロック、という感じです。  
いわゆる**先行ブロック**と呼ばれる行為にあたります。  

# ブロックの何がいけないの？

ところで、このブロックという行為、ひとつデメリットがあります。  
それはもちろん、これですよね。

- 人を拒絶するため、見てもらえるコンテンツが見てもらえなくなる

これに尽きると思います。  
ここでさっき宣伝した曲が出てくるんですが、もしかしたら

「**曲が伸びないのは、自分が100万弱の人間をブロックしているからなのでは？**」

と思ったんですね。  
Twitterのアクティブユーザーが予想で1億人いるとして、1%に満たない数字だとしても、100万人の人には届かない。  

これはいけない…  
ブロック解除しなくちゃ…でも100万人もポチポチするの嫌じゃ…

そうだ、APIでなんとかならないか！？

# な　り　ま　し　た

では本題です。  
**Pythonを用いてTwitterのAPIを使ってブロックを全部解除**していきましょう。  
~~なんでPython？それしか使えないからだよ~~

まず用意するものはこちら。

## Twitter API使用権限を用意する

このへんを参考に取得してください。
> - [Twitter API 登録 \(アカウント申請方法\) から承認されるまでの手順まとめ　※2019年8月時点の情報 \- Qiita](https://qiita.com/kngsym2018/items/2524d21455aac111cdee)

取得したものを、とりあえずわかりやすく`key.py`にぶちこんでおきましょう。

```python:title=key.py
API_KEY = 'hoge'
API_SECRET = 'hoge'
ACCESS_TOKEN = 'hoge'
ACCESS_TOKEN_SECRET = 'hoge'

def api():
    # TwiterのAPIを使えるようにする
    api = OAuth1Session(
        API_KEY,
        API_SECRET,
        ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET
    )

    return api

```

これで `key.api()`を実行すると返り値としてTwitterのAPI使用権限が渡されます。

# 実際にAPIを動かしてみよう

最終的にしたいことを箇条書きにするとこうなります。

- ブロックした人間のリストを取得する
- 片っ端からブロックを解除する

とりあえずスクリプトの名前はAPIの名前からとって`block_destroy.py`としましょう。

## ブロックした人間のリストを取得する関数を作る

```python:title=block_destroy.py

import key
import json


def get_ids():
    twitter = key.api_proc()
    url = 'https://api.twitter.com/1.1/blocks/ids.json'
    res = twitter.get(url)
    id_dict = json.loads(res.text)
    ids = id_dict['ids']
    twitter.close()

    return ids
```

### 解説1

- `https://api.twitter.com/1.1/blocks/ids.json`をGETして`res`を取得。

> これは、ブロックしたアカウントをidリストとして出力するようなAPIアドレス。

- `res`の中にある`text`を引っ張り出す。
- `text`はjson形式なので`json.loads()`で辞書型に変換。
- ほしいのは辞書ではなく配列なので、辞書に格納されている配列を`'ids'`で取り出す。
- `return`で関数の外へ引っ張り出す。
> ちなみにこれで取得できるアカウントの件数は一度に5000件。


## idをもとにブロックを解除する関数を作る

```python:title=block_destroy.py
import key


def destroy(_id):
    twitter = key.api_proc()
    url = f'https://api.twitter.com/1.1/blocks/destroy.json'
    params = {'user_id': _id}
    twitter.post(url, params=params)

    twitter.close()
```

### 解説2

- `https://api.twitter.com/1.1/blocks/destroy.json`


>これは、パラメーター付与してPOSTすると、そのアカウントのブロックを解除するAPIアドレス。

- 関数`destroy`にユーザーのIDを渡すとブロックを解除するように作る。
- `params`でパラメーターを定義し、idをそこに付与する。
- URLにパラメーターを付与してPOST、ブロックの解除が成立する。


## ふたつの関数をつなぎ合わせる関数を作る

```python:title=block_destroy.py
from tqdm import tqdm
from multiprocessing import Pool


def main():
    ids = get_ids()
    if len(ids) == 0:
        exit()
    pool = Pool(processes=10)
    print('-' * 10)
    with tqdm(total=len(ids)) as t:
        for _ in pool.imap_unordered(destroy, ids):
            t.update(1)


if __name__ == "__main__":
    while True:
        main()
```

### 解説3

- `get_ids`でアカウントIDを5000件取得。
- `if`…もしアカウントIDが0件だったら`exit()`処理を終了する。

> この処理を入れるのは、前述したとおり、一度に取得できるアカウントIDの個数が5000件のため。  
> next cursor？そんなの知らない！

- `pool`でサブプロセスを起動して処理の並列化を行い、高速化を図る
- ついでに`tqdm`で進捗をわかりやすくする
- `destroy`関数を実行し、`ids`の中身を順番に渡すことでブロック解除を行う
- 以下ブロック件数0になるまで無限ループ


# これでスッキリ全員ブロックできた

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">なんというか…清々しい気分だ… <a href="https://t.co/kYaQJLezW2">pic.twitter.com/kYaQJLezW2</a></p>&mdash; Sotono / 爪楊枝 (@_Sotono) <a href="https://twitter.com/_Sotono/status/1321277104076386305?ref_src=twsrc%5Etfw">October 28, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

おわり。


# 参考
- [Twitter REST APIの使い方](https://syncer.jp/Web/API/Twitter/REST_API/)
- [ちょっとかしこいtqdm② ~ multiprocessing編 ~ \- Qiita](https://qiita.com/namahoge/items/c390e79693605234212b)
