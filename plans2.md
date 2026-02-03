# 「杜の穂」文字部分をHPに実装する計画書（横書き＋筆文字）

目的は、写真の「文字（店名／日付／文章）」を **横書き** で表示し、雰囲気を **筆文字っぽいフォント** で寄せること。
画像そのものではなく、テキストとして実装する（検索できる／コピーできる／表示が崩れにくい）。

---

## 1. 実装する文字（確定テキスト）

### 店名
- 杜の穂

### 日付
- 2023.04.22

### 文章（横書きに組み替え）
写真は縦書きで右→左に並んでいるので、意味が自然になるよう横書きに並べ替える。

> いつも ほっとした ふたり  
> 一息つける みんなの居場所。  
> すてきな出逢いに恵まれ  
> 楽しく歩ける えがお  
> 歩き続けていける 空間を

※最後の「くう」「かんを」は合わせて「空間を」の意味。

---

## 2. フォント方針（筆文字っぽいWebフォント）

### 第一候補：Yuji Syuku（筆文字に近い）
- Google Fontsの説明で、書家の手書きをデジタル化した「Yuji」シリーズの一つ。  [oai_citation:0‡Google Fonts](https://fonts.google.com/specimen/Yuji%2BSyuku?utm_source=chatgpt.com)

### 第二候補：Yuji Boku（和風・手書き寄り）
- 同じく「Yuji」シリーズ。  [oai_citation:1‡Google Fonts](https://fonts.google.com/specimen/Yuji%2BBoku?utm_source=chatgpt.com)

### 第三候補：Yusei Magic（太めの手書き、筆よりマーカー寄り）
- 手書き系だが筆感は弱め。導入の例（link / import）も確認できる。  [oai_citation:2‡Google Fonts](https://fonts.google.com/specimen/Yusei%2BMagic?utm_source=chatgpt.com)

---

## 3. 実装仕様（見た目）

### レイアウト
- 横書き
- 店名（大きく）
- 日付（小さく）
- 文章（2〜4行に整形、読みやすさ優先）

### 色
- 通常：黒（または濃いグレー）
- 強調：赤（写真の雰囲気に合わせる）
  - 強調対象：写真で赤い文字だった「ふたり」「す」「え」など
  - 実装では <span class="accent"> で包む

### レスポンシブ
- PC：タイトル大、本文は余白広め
- スマホ：文字サイズを少し下げ、行間を広げて読みやすく

---

## 4. ファイル構成（例）

- `src/components/CalligraphyBlock.tsx`（または `.jsx`）
- `src/styles/calligraphy.css`（または globals.css に追記）
- （Next.jsの場合）`app/layout.tsx` or pages/_document.tsx にフォント読み込み

※フレームワークが違うなら、同じ内容をHTML/CSSに置き換えるだけでよい。

---

## 5. 実装手順（Claude Codeにやってもらう順）

### Step 1: コンポーネント（HTML構造）を作る
- 店名、日付、本文をセマンティックに配置
- 強調したい文字だけ span.accent を付ける

### Step 2: フォントを読み込む
- Google Fontsを <link> で読み込む（推奨）
- 例：Google Fontsの導入は、CSS指定だけで使える説明がある。  [oai_citation:3‡fuuno.net](https://fuuno.net/web02/googlefonts/googlefonts.html?utm_source=chatgpt.com)
- Yusei Magicは link/import の具体例が載っている。  [oai_citation:4‡ec.excellent.ne.jp](https://ec.excellent.ne.jp/fonts/95/?utm_source=chatgpt.com)
  - 同じやり方で Yuji 系も読み込める（Google Fontsから取得）

### Step 3: CSSを当てる
- 見出しのサイズ、行間、余白
- .accent の赤、少しだけ大きく（やりすぎない）

### Step 4: 画面幅で微調整
- 600px以下で文字サイズと行間を調整

### Step 5: 最終チェック
- フォントが読み込めない環境でも崩れない（フォールバックを用意）
- コピペで文章が自然に読める

---

## 6. 受け入れ条件（完成の判断）

- 横書きで自然に読める
- 筆文字っぽいフォントで表示される
- スマホでも読める（改行が破綻しない）
- 強調色が使われ、雰囲気が近い
- 文字が画像ではなくテキストとして扱える

---

## 7. Claude Codeに渡す実装指示（そのまま貼る用）

以下を実装してください。

1) 「杜の穂」の文字ブロックを横書きで表示するUIを作る  
2) フォントはGoogle Fontsの筆文字系を使う。第一候補は「Yuji Syuku」、次に「Yuji Boku」。読み込みは <link> を使う  
3) 次の文面を表示する（自然な横書き）  
   - タイトル：杜の穂  
   - 日付：2023.04.22  
   - 本文：  
     いつも ほっとした <span class="accent">ふ</span><span class="accent">た</span><span class="accent">り</span>  
     一息つける みんなの居場所。  
     <span class="accent">す</span>てきな出逢いに恵まれ  
     楽しく歩ける <span class="accent">え</span>がお  
     歩き続けていける 空間を

4) CSSで余白・行間を整える。`.accent` は赤で少し大きくする  
5) 画面幅が狭いときは文字サイズと行間を調整して読みやすくする  
6) フォールバックフォントも指定する

---

## 補足（なぜこの方針か）
- Google Fontsなら、端末にフォントがなくても同じ見た目にできる。  [oai_citation:5‡fuuno.net](https://fuuno.net/web02/googlefonts/googlefonts.html?utm_source=chatgpt.com)
- Yuji系は書家の手書き由来のフォントとして説明されていて、筆文字の方向に寄せやすい。  [oai_citation:6‡Google Fonts](https://fonts.google.com/specimen/Yuji%2BSyuku?utm_source=chatgpt.com)