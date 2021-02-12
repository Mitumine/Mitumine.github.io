---
title: 【Gatsby.js】対処しよう、「Input file contains unsupported image format」に
date: "2021/02/12"
description: "Gatsby"
tags: ["program"]
# thumbnail: 0.png
---

# 概要

- Gatsby を Netlify で build した時に出たエラーが出る
- `Error: Input file contains unsupported image format`
- なんかパッケージを全部バージョンアップしたら治った

# トラブルシューティング

[Error: Input file contains unsupported image format, gatsby \- Support \- Netlify Community](https://community.netlify.com/t/error-input-file-contains-unsupported-image-format-gatsby/10891)

によると、以下の文言がありました。

> I tried to the suggetion but it doesn`t work.  
> I think I mistook maybe.  
> But I fixed it this followings:  
> Find old version for sharp: npm list sharp  
> Upgrade version dependencies that uses old sharp version.

やんわり翻訳すると **「Sharp のバージョンが古いからだめなんじゃね？」** ということらしいです、やんわりすぎる。

教示されたやり方でパッケージを確認したら、確かに古いパッケージが見つかりました。

```sh:title=terminal
$ npm list sharp
gatsby-starter-blog@0.1.0 ~
├─┬ gatsby-plugin-manifest@2.6.1
│ └── sharp@0.25.4
├─┬ gatsby-plugin-sharp@2.14.0
│ └── sharp@0.27.1
└─┬ gatsby-transformer-sharp@2.12.0
  └── sharp@0.27.1
```

じゃあこれをアップデートしたら治るんじゃね！？

**…どうやって？** (Python 以外の能がない男)

# というわけで

パッケージを全部最新にしてみたらうまくいきました。

```sh:title=terminal
# ncuを使えるようにする
$ npm install -g npm-check-updates

# プロジェクトフォルダーに移動
$ cd ~

# バージョンのチェック
$ ncu
Upgrading ~/package.json
[====================] 29/29 100%

 gatsby                            ^2.32.0  →  ^2.32.3
 gatsby-plugin-feed                 ^2.7.0  →  ^2.13.0
 gatsby-plugin-manifest             ^2.6.1  →  ^2.12.0
 gatsby-plugin-offline              ^3.4.0  →  ^3.10.0
 gatsby-plugin-react-helmet         ^3.4.0  →  ^3.10.0
 gatsby-plugin-sharp               ^2.14.0  →  ^2.14.1
 gatsby-remark-copy-linked-files    ^2.4.0  →  ^2.10.0
 gatsby-remark-images               ^3.5.1  →  ^3.11.0
 gatsby-remark-responsive-iframe    ^2.5.0  →  ^2.11.0
 gatsby-remark-smartypants          ^2.4.0  →  ^2.10.0
 gatsby-transformer-remark         ^2.10.0  →  ^2.16.0
 react                            ^16.12.0  →  ^17.0.1
 react-dom                        ^16.12.0  →  ^17.0.1
 react-helmet                       ^5.2.1  →   ^6.1.0
 typeface-merriweather              0.0.72  →   1.1.13
 typeface-montserrat                0.0.75  →   1.1.13

Run ncu -u to upgrade package.json

# 更新かける
$ ncu -u
省略
Run npm install to install new versions.

$ npm install
省略

$ ncu
Checking /Users/Sotono/Documents/Works/21/web/sotono_web/package.json
[====================] 29/29 100%

All dependencies match the latest package versions :)
```

## 参考

> - [npm のパッケージを最新版に更新する – ラボラジアン](https://laboradian.com/update-npm-packages/)
> - [Error: Input file contains unsupported image format, gatsby \- Support \- Netlify Community](https://community.netlify.com/t/error-input-file-contains-unsupported-image-format-gatsby/10891/4)
