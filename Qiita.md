# constがわからん
上書きできると思って、同じ名前で定数を宣言したアホがいるらしい

[TypeError: invalid assignment to const "x" \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment)
なるほど理解、定数は上書きせずちゃんと名前変えようね


# タグ機能をつける
[Gatsbyにタグ機能、カテゴリ機能をつける（基礎編） \- Qiita](https://qiita.com/yoshiki-0428/items/71d80713ffc264cf40f1#3-%E3%82%BF%E3%82%B0%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8Btagtag)

なんかうまくいかないので、元コードを見ながら調整していく。

[gatsby\-starter\-blog/gatsby\-node\.js at master · gatsbyjs/gatsby\-starter\-blog](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js)

# タグ機能を拡張してひとつのページとして成り立たせる

タグ機能をここまでしてつけたかったのは、独立したページとして動的に更新したかったため。
なのでここからもうちょっと頑張ってタグページを構築していく。

SocialImage？というものが必要らしいので設定していく。
[gatsby\-theme\-blog で SNS アイキャッチ画像を表示する方法 \| typememo\.jp](https://typememo.jp/tech/gatsby-theme-blog-how-to-enable-social-image/)

詰まった、どうしたらいいんだろう…

やりたいこと…タグ一覧のページにサムネイルを表示させたい。



`...GatsbyImageSharpFixed`とか出てきた、訳がわからないので一旦ググる。
こういうふうに代用ができるらしいので一度設定する。
```
thumbnail {
  childImageSharp {
    fluid(maxWidth: 1280) {
      base64
      aspectRatio
      src
      srcSet
      sizes
    }
  }
}
```
[graphql \- Gatsby Querying image using graphiql \- Stack Overflow](https://stackoverflow.com/questions/62263308/gatsby-querying-image-using-graphiql)

[GatsbyJSブログの記事のトップ画像と記事一覧のサムネイル画像を追加した \| のふのふろぐ](https://rpf-noblog.com/2020-05-10/gatsby-hero/)


それを踏まえた上で調整すると、やっとサムネイルを記事内で表示できた！！
画像の表示がおかしくなったので、`gatsby clean`したら良くなった。

というわけで本番、タグ一覧にサムネイルを表示させます。




# ピックアップをホームに表示させる

無事タグ一覧にサムネイルを表示できたので、次はホーム画面にピックアップを載せます。
やることはこんな感じ。
- pickupのタグがついてる記事を表示する
- サムネイルも表示させる
以上っ！



# メールフォームを設置する

[Netlify FormsをつかってGatsbyにお問い合わせフォームを追加するまで \- Qiita](https://qiita.com/hiropy0123/items/2e8d14ea66b78ab64847)

メールフォーム組み立てるの初めてだったんですけど、どうやらlabelの位置に気をつけなければならない感じらしく、

[javascript \- EsLint rule for label \- Stack Overflow](https://stackoverflow.com/questions/54446655/eslint-rule-for-label)

を参考に調整しました。



# フォントをTypographyなるものでキメる

何故かTypographyを入れるとエラー履いたので、コンソールに従ってインストールアンドフィックス。
ついでに困ったときの`gatsby clean`。

改めてTypographyを使えるようになったので設定していく。

[Typography を使ってテーマを使いつつ Google Fonts を設定してみる \| Blog](https://dotgirl.net/2020/02/12/typography-google-fonts/)