---
title: "どうせ起動してるPCを使って、宣伝ツイートを自動でRTする"
date: "2021/01"
description: "Techno"
tags: ["program"]
thumbnail: 0.png
---

![0](0.png)

# 概要

いちいちリツイートボタンを押しに行くのがめんどくさいので、
せや！自動化したろ！というおはなし。

# リツイート何度も繰り返すのは案外めんどくさい

僕は音楽とかそういったのを作るのがすきなんですけど、  
先日、新曲を発表しました。  
宣伝になりますが、ぜひ聞いてみてください。

<!-- <iframe width="1280" height="720" src="https://www.youtube.com/embed/KFBYnI13tKk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

…

**これ何度も宣伝するのめんどくさくね？**  
…とふと思いました。  
めんどくさいので、じゃあ自動化しましょう。

# Twitter API 使えるように準備

## Twitter API 使用権限を用意する

このへんを参考に取得してください。

> - [Twitter API 登録 \(アカウント申請方法\) から承認されるまでの手順まとめ　※2019 年 8 月時点の情報 \- Qiita](https://qiita.com/kngsym2018/items/2524d21455aac111cdee)

取得したものを、とりあえずわかりやすく`key.py`にぶちこんでおきましょう。

```python:title=key.py
API_KEY = 'hoge'
API_SECRET = 'hoge'
ACCESS_TOKEN = 'hoge'
ACCESS_TOKEN_SECRET = 'hoge'
```

次に`Twitter_API.py`を作成して、API を使えるようにしましょう。

```python:title=Twitter_api.py

import key

API_KEY = key.API_KEY
API_SECRET = key.API_SECRET
ACCESS_TOKEN = key.ACCESS_TOKEN
ACCESS_TOKEN_SECRET = key.ACCESS_TOKEN_SECRET


def api_proc():
    # TwiterのAPIを使えるようにする
    api = OAuth1Session(
        API_KEY,
        API_SECRET,
        ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET
    )

    return api
```

これで `Twitter_api.api_proc()`を実行すると返り値として Twitter の API 使用権限が渡されます。

# 実際に API を動かしてみよう

## やりたいことをまとめる

したいことをわかりやすくまとめるとこうなります。

- 指定したツイート ID を、自分のアカウントで RT 解除する。
- 指定したツイート ID を、自分のアカウントで RT する。

なぜ解除が必要か？と言うと、同じツイートを 2 回リツイートすることはできないので、  
同じツイートをリツイートしたい場合は一度解除する必要があるからです。  
ちなみに、エラーなどは一切発生しません。(厳密には exception が発生しない)

## 当該ツイートの ID を取得する

Twitter の当該ツイートのページへ飛びます。  
PC なら適当なツイートのどこでもいいのでクリックすれば飛ぶと思います。  
そうでない場合、だいたい日付をクリックすれば当該ツイートへ移動できます。

そのページの URL は以下の通りになっていると思います。

> `https://twitter.com/MushroomRecord/status/1346128262871744512`

これの`status`の右側、つまりこの URL だと`1346128262871744512`が該当 ID となります。  
これを使用するので控えておきましょう。

## API を動かす

今回は`POST`で API を動かすだけで簡単に終わるので、  
スクリプトも簡単になります。

```python:title=main.py
import Twitter_API


def main(tweet_id: int):
    TWITTER = Twitter_API.api_proc()
    URL_TWITTER = 'https://api.twitter.com/1.1/statuses'
    URL_RT = f'{URL_TWITTER}/retweet/{tweet_id}.json'
    URL_UNRT = f'{URL_TWITTER}/unretweet/{tweet_id}.json'

    TWITTER.post(URL_UNRT)
    TWITTER.post(URL_RT)


if __name__ == '__main__':
    tweet_id = 1346128262871744512
    main(tweet_id)

```

これを実行すると、僕の宣伝ツイートが RT されると思います。  
`tweet_id`を変更すれば非公開アカウントでない限りどんなツイートも RT することができるはずです。

# どうせ起動している PC を使って定期的に実行する

僕はずっと PC もとい Mac をつけっぱなしにしているので、  
このズボラな点を使って定期的に実行できるようにします。

`cron`とかあったよなーと思いつつも調べたら、  
Mac だと`Launchd`のほうが良いみたいです、よくわからんけど。

というわけで`Launchd`を使って定期実行を行います。

```xml:autoself_retweet.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>autoself_retweet</string>

        <key>ProgramArguments</key>
        <array>
            <string>pythonのパス</string>
            <string>スクリプトのパス</string>
        </array>

        <key>StartInterval</key>
        <integer>3600</integer>

    </dict>
</plist>

```

`key`と`なんかの属性`がセットになっていると考えながら構築します。

- `Label`は任意の名前をセットします。  
  **`Label`と`ファイル名`は同一である必要があります。**

- `ProgramArguments`に実行したいコマンドとパラメータを入れます。

  > ここがよくわからなくて、本当は「cd で移動して、そこのスクリプトを読み込んで〜」と汎用性ある記述にしたかったんですが、  
  > うまく行かなかったので、実用性重視でコマンドとして一行にまとめるような記述になってるんですが、  
  > 詳しい方いたらご教授いただけると幸いです。

- `StartInterval`で何秒おきに実行するかを決めます。

## 定期実行できるようにセットする

これで n 秒おきに Python スクリプトを実行する環境が整ったので、実際に Mac に仕込みます。

- `~/Library/LaunchAgents`に`autoself_retweet.plist`を設置します。
- ターミナルで以下コマンドを入力すると、定期実行が開始されます。

```zsh:Terminal
$ launchctl load ~/Library/LaunchAgents/autoself_retweet.plist
```

- もし、上記手順を踏んでもスクリプトが実行されない、テストに失敗していると思ったときは以下コマンドで unload します。

```zsh:Terminal
$ launchctl unload ~/Library/LaunchAgents/autoself_retweet.plist
```

それでは、良い定期実行ライフを。

# 参考

[launchd で定期的にスクリプトを実行 \- Qiita](https://qiita.com/rsahara/items/7d37a4cb6c73329d4683)
