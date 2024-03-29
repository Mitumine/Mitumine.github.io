

# 備忘録

## const がわからん

上書きできると思って、同じ名前で定数を宣言したアホがいるらしい

[TypeError: invalid assignment to const "x" \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment)

> 同じブロックスコープで同じ定数名に値を代入すると、エラーがスローされます
> なるほど理解、定数は上書きしないようにしようね。

## タグ機能をつける

[Gatsby にタグ機能、カテゴリ機能をつける（基礎編） \- Qiita](https://qiita.com/yoshiki-0428/items/71d80713ffc264cf40f1#3-%E3%82%BF%E3%82%B0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8Btagtag)

なんかうまくいかないので、元コードを見ながら調整していく。

[gatsby\-starter\-blog/gatsby\-node\.js at master · gatsbyjs/gatsby\-starter\-blog](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js)

## タグ機能を拡張してひとつのページとして成り立たせる

タグ機能をここまでしてつけたかったのは、独立したページとして動的に更新したかったため。
なのでここからもうちょっと頑張ってタグページを構築していく。

SocialImage？というものが必要らしいので設定していく。
[gatsby\-theme\-blog で SNS アイキャッチ画像を表示する方法 \| typememo\.jp](https://typememo.jp/tech/gatsby-theme-blog-how-to-enable-social-image/)

詰まった、どうしたらいいんだろう…

やりたいこと…タグ一覧のページにサムネイルを表示させたい。

[graphql \- Gatsby Querying image using graphiql \- Stack Overflow](https://stackoverflow.com/questions/62263308/gatsby-querying-image-using-graphiql)

[GatsbyJS ブログの記事のトップ画像と記事一覧のサムネイル画像を追加した \| のふのふろぐ](https://rpf-noblog.com/2020-05-10/gatsby-hero/)

それを踏まえた上で調整すると、やっとサムネイルを記事内で表示できた！！
画像の表示がおかしくなったので、`gatsby clean`したら良くなった。

というわけで本番、タグ一覧にサムネイルを表示させます。

# ピックアップをホームに表示させる

無事タグ一覧にサムネイルを表示できたので、次はホーム画面にピックアップを載せます。
やることはこんな感じ。

- pickup のタグがついてる記事を表示する
- サムネイルも表示させる
  以上っ！

# メールフォームを設置する

[Netlify Forms をつかって Gatsby にお問い合わせフォームを追加するまで \- Qiita](https://qiita.com/hiropy0123/items/2e8d14ea66b78ab64847)

メールフォーム組み立てるの初めてだったんですけど、どうやら label の位置に気をつけなければならない感じらしく、

[javascript \- EsLint rule for label \- Stack Overflow](https://stackoverflow.com/questions/54446655/eslint-rule-for-label)

を参考に調整しました。

# フォントを Typography なるものでキメる

何故か Typography を入れるとエラー履いたので、コンソールに従ってインストールアンドフィックス。
ついでに困ったときの`gatsby clean`。

改めて Typography を使えるようになったので設定していく。

[Typography を使ってテーマを使いつつ Google Fonts を設定してみる \| Blog](https://dotgirl.net/2020/02/12/typography-google-fonts/)

# 急にサムネイルがバグった

md 内で指定してるパスを間違えているとエラーを履くみたい。
[Gatsby\.js と Netlify CMS を用いてブログを作る際に知っておきたかった事 \- CodeLabo](https://codelabo.com/posts/20200329163855)

# Twitter を埋め込みたい

普通に埋め込みをコピペすると以下のような表示になります。

> 「-1」
>
> ゼロより遠いところから始まる僕の歌。  
> ピコピコ少年的な曲です。
>
> Youtube:https://t.co/Pa6Skw5KBC  
> Nico:https://t.co/HwQ1mnzygO#vocaloPost #vocaloid #AI きりたん #NEUTRINO #拡散希望 pic.twitter.com/>OkCvCwS042
>
> — Sotono. (@\_Sotono) January 20, 2021

うーん、これでは見栄えが悪い。  
引用したいんだけど、俺は**埋め込みたい**んだ

というわけで、プラグインをインストールします。

```sh
$ npm install --save gatsby-plugin-twitter
```

プラグインを導入したので、`gatsby-config.js`をいじります。
やることは簡単。

- `plugins`の欄に、
- `gatsby-plugin-twitter`を挿入する。

```js:title=gatsby-config.js
  plugins: [
    // 省略
    `gatsby-plugin-twitter`,
  ]
```

これでようやく Twitter を埋め込むことができます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">「-1」<br><br>ゼロより遠いところから始まる僕の歌。<br>ピコピコ少年的な曲です。<br><br>Youtube:<a href="https://t.co/Pa6Skw5KBC">https://t.co/Pa6Skw5KBC</a><br>Nico:<a href="https://t.co/HwQ1mnzygO">https://t.co/HwQ1mnzygO</a><a href="https://twitter.com/hashtag/vocaloPost?src=hash&amp;ref_src=twsrc%5Etfw">#vocaloPost</a> <a href="https://twitter.com/hashtag/vocaloid?src=hash&amp;ref_src=twsrc%5Etfw">#vocaloid</a> <a href="https://twitter.com/hashtag/AI%E3%81%8D%E3%82%8A%E3%81%9F%E3%82%93?src=hash&amp;ref_src=twsrc%5Etfw">#AIきりたん</a> <a href="https://twitter.com/hashtag/NEUTRINO?src=hash&amp;ref_src=twsrc%5Etfw">#NEUTRINO</a> <a href="https://twitter.com/hashtag/%E6%8B%A1%E6%95%A3%E5%B8%8C%E6%9C%9B?src=hash&amp;ref_src=twsrc%5Etfw">#拡散希望</a> <a href="https://t.co/OkCvCwS042">pic.twitter.com/OkCvCwS042</a></p>&mdash; Sotono. (@_Sotono) <a href="https://twitter.com/_Sotono/status/1351848364778799104?ref_src=twsrc%5Etfw">January 20, 2021</a></blockquote>

# カードのサイズを揃えよう

bootstrap でカードの高さを揃えるには

```css:title=style.css
.card{
  height:100%;
}
```

…なんか力技な気がするけど揃ったのでヨシ！

---

## フラグメント

同じクエリを何度も書くのはめんどくさいしメンテナンスがめちゃくちゃなので、
フラグメントってやつを使って一元化しちゃいましょう。

[Using GraphQL Fragments \| Gatsby](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/using-graphql-fragments/)

## Google アナリティクス導入

プラグインを導入するだけでイケるらしいので、導入アンド config 追記。

[gatsby\-plugin\-google\-analytics \| Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-analytics/#make-sure-plugin-and-script-are-loaded-first)

## Netlify でデプロイするぞ

### トラブルシューティング

#### 大文字小文字の区別ついてる？

Q,`Netlify`でビルドしてたら以下のようなエラーが出ました

```
error Generating JavaScript bundles failed
Can't resolve '../components/Cards' in '/opt/build/repo/src/pages'
If you're trying to use a package make sure that '../components/Cards' is installed. If you're trying to use a local file make sure that the path is correct.
```

A. 僕の場合ですが、大文字小文字でミスってました。  
`card`を指定したつもりが`Card`になっていたので直したら通りました。

#### パッケージのバージョン大丈夫？

Q. `Netlify`でビルドしてたら以下のようなエラーが出ました

```
Error: Input file contains unsupported image format
```

A. 僕の場合ですが、パッケージをすべて最新版にしたら直りました。
[詳しくは別記事で解説します。](../error-sharp)
