# GitHub Pages + Cloudflare ドメイン設定ガイド

## 前提

- GitHub Pagesでサイトが公開済み（現在のURL: `https://tappypuppy.github.io/mori-no-sumika-HP/`）
- Cloudflareでドメインを取得済み（または取得予定）

## なぜこの組み合わせが良いか

- **無料**: 両方とも無料で利用可能
- **高速**: CloudflareのCDNで世界中から高速アクセス
- **安全**: 無料SSL証明書、DDoS保護
- **簡単**: 設定がシンプル

---

## 手順

### Step 1: Cloudflareでドメインを取得

1. [Cloudflare](https://dash.cloudflare.com/)にログイン
2. 左メニュー「**Domain Registration**」→「**Register Domains**」
3. 希望のドメインを検索して購入（例: `morinosumika.com`）

※すでに取得済みの場合はスキップ

---

### Step 2: CloudflareにDNS設定を追加

1. Cloudflareダッシュボードで該当ドメインを選択
2. 左メニュー「**DNS**」→「**Records**」
3. 以下の4つのAレコードを追加:

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| A | @ | 185.199.108.153 | Proxied |
| A | @ | 185.199.109.153 | Proxied |
| A | @ | 185.199.110.153 | Proxied |
| A | @ | 185.199.111.153 | Proxied |

4. wwwサブドメインも使いたい場合、CNAMEを追加:

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| CNAME | www | tappypuppy.github.io | Proxied |

---

### Step 3: GitHub側でカスタムドメインを設定

#### 方法A: GitHub管理画面から設定

1. リポジトリ（`mori-no-sumika-HP`）を開く
2. 「**Settings**」タブをクリック
3. 左メニュー「**Pages**」をクリック
4. 「**Custom domain**」欄にドメインを入力（例: `morinosumika.com`）
5. 「**Save**」をクリック
6. 「**Enforce HTTPS**」にチェックを入れる（数分後に有効化可能）

#### 方法B: CNAMEファイルを作成

リポジトリのルートに`CNAME`ファイルを作成:

```
morinosumika.com
```

※ドメイン名のみを1行で記載（https://は不要）

---

### Step 4: CloudflareのSSL設定を確認

1. Cloudflareダッシュボードで該当ドメインを選択
2. 左メニュー「**SSL/TLS**」→「**Overview**」
3. 暗号化モードを「**Full**」に設定

> ⚠️ 「Full (strict)」ではなく「**Full**」を選択してください

---

### Step 5: 動作確認

1. 5〜30分待つ（DNS反映に時間がかかる場合あり）
2. ブラウザで `https://あなたのドメイン.com` にアクセス
3. サイトが表示されればOK！

---

## トラブルシューティング

### サイトが表示されない場合

- DNSの反映に最大48時間かかる場合があります（通常は数分〜数時間）
- `nslookup あなたのドメイン.com` でDNS設定を確認

### 「この接続は安全ではありません」と表示される場合

- CloudflareのSSL設定が「Full」になっているか確認
- GitHub Pagesの「Enforce HTTPS」が有効か確認

### リダイレクトループが発生する場合

- CloudflareのSSL設定を「Flexible」から「Full」に変更

---

## 完了後の構成図

```
ユーザー
    ↓ https://morinosumika.com
Cloudflare（CDN + SSL + DDoS保護）
    ↓
GitHub Pages（ホスティング）
    ↓
リポジトリ（mori-no-sumika-HP）
```

---

## 参考リンク

- [GitHub Pages カスタムドメイン設定](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Cloudflare DNS設定](https://developers.cloudflare.com/dns/)
