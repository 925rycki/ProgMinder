# ProgMinder

[![backend](https://github.com/925rycki/ProgMinder/actions/workflows/backend.yml/badge.svg)](https://github.com/925rycki/ProgMinder/actions/workflows/backend.yml)

# 概要
プログラミング学習の記録サービス『ProgMinder』<br>手軽にプログラミング学習の記録を作成できるサービスです。
  こちらのサービスはつぎの課題を解決します。
- どうやって日報を作成すればよいのかが分からない
- 日報を作成するのに労力がかかる。
- 日報のフォーマットをコピペで作成していると修正ミスが起こる。

また、他の人の日報が見れるので学習のヒントを得たり、モチベーションアップに繋がります。

# ER図
```mermaid
erDiagram
  users ||--o{ reports : "1人のユーザーは0以上の日報を持つ"
  users ||--o{ likes: "1人のユーザーは0以上のいいねを持つ"
	users ||--o{ comments: "1人のユーザーは0以上のコメントを持つ"
  reports ||--o{ likes: "1つの日報は0以上のいいねを持つ"
  reports ||--o{ comments: "1つの日報は0以上のコメントを持つ"
	users }o--o{ follows : "1人のユーザーは0以上のフォロー関係を持つ"

  users {
    bigint id PK
		varchar(255) provider
		varchar(255) uid
		datetime(6) reset_password_sent_at
		tinyint(1) allow_password_change
		datetime(6) remember_created_at
		datetime(6) confirmed_at
		datetime(6) confirmation_sent_at
		varchar(255) unconfirmed_email
    varchar(255) name
		varchar(255) nickname
		varchar(255) image
		varchar(255) email
		varchar(255) bio
		varchar(255) tokens
  }

  reports {
    bigint id PK
    bigint user_id FK
    varchar(255) created_date "作成日"
    varchar(255) todays_goal "本日の目標"
		int study_time "学習時間"
		varchar(255) goal_review "目標振り返り"
		varchar(255) challenges "詰まっていること"
		varchar(255) learnings "学んだこと"
		varchar(255) thoughts "感想"
		varchar(255) tomorrows_goal "明日の目標"
  }

  likes {
    bigint id PK
    bigint user_id FK
    bigint report_id FK
  }

	comments {
		bigint id PK
		bigint user_id FK
		bigint report_id FK
		varchar(255) content
	}

	follows {
    bigint id PK
    bigint follower_id FK
    bigint followed_id FK
  }
```

# 機能一覧
- ユーザー新規登録
- サインイン
- サインアウト
- アカウント情報更新
- プロフィールアイコン画像投稿
- アカウント削除
- 日報投稿
- 日報一覧
- 日報編集
- 日報削除
- いいね
- コメント
- フォロー・アンフォロー
- フォロー中のユーザーの日報一覧
- 自分の日報一覧