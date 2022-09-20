# 就活進捗アプリ

URL: https://zd613.github.io/syukatsu-sintyoku-app/

ターゲット: スマホ

## 目的

就活選考状況の可視化



## プロジェクトセットアップ

```sh
npm ci
```

or 

```sh
npm install
```

### 開発サーバー起動

```sh
npm run dev
```

### 本番用にビルド

```sh
npm run build
```

### ユニットテスト実行([Vitest](https://vitest.dev/))

```sh
npm run test:unit
```

### End-toEndテスト実行([Cypress](https://www.cypress.io/))

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### [ESLint](https://eslint.org/)を実行

```sh
npm run lint
```


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
