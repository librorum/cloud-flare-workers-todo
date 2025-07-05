# Cloudflare Workers Template
클라우드플레어 워커스를 이용한 풀스택 앱의 시작 템플릿입니다.
프론트엔드는 quasarv2(vue3)를 이용하였습니다.
vscode에게 프론트엔드와 백엔드를 동시에 디버깅하기 위한 설정도
launch.json에 되어 있습니다.
만든 과정은 아래에 설명되어 있습니다.
이 설명을 따라서 만들거나,
아니면 이 템플릿으로 프로젝트를 시작해서
이름을 변경하거나,
wrangler에서 생성시 이 템플릿의 github 주소를 입력해서
만들 수 있습니다.

This is a starter template for full-stack applications using Cloudflare Workers.
The frontend uses Quasar v2 (Vue 3).
The configuration for debugging both frontend and backend simultaneously in VSCode
is included in launch.json.
The creation process is described below.
You can follow this guide to create your own,
or start a project with this template and
change the names,
or input this template's GitHub URL when creating with wrangler.

## Project Setup(복잡한 버전)
프로젝트 설정
```
# 기본 설치 과정
npm install -g pnpm
```
```sh
# 프로젝트 생성
# Create project
mkdir helloflare
cd helloflare
# 현재 디렉토리에 생성
# Create in current directory
pnpm dlx wrangler init .
╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./.
│
╰ What would you like to start with?
  ○ Hello World example
  ○ Framework Starter
  ○ Application Starter
  ● Template from a GitHub repo
  ◁ Go back

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./.
│
├ What would you like to start with?
│ category Template from a GitHub repo
│
╰ What's the url of git repo containing the template you'd like
to use?
# 에서 https://github.com/librorum/cloud-flare-workers-template.git 입력하고 엔터
├ What's the url of git repo containing the template you'd like
to use?
│ repository
https://github.com/librorum/cloud-flare-workers-template.git
```
## Project Setup(복잡한 버전)
프로젝트 설정
```
# 기본 설치 과정
npm install -g pnpm
```
```sh
# 프로젝트 생성
# Create project
mkdir helloflare
cd helloflare
# 현재 디렉토리에 생성
# Create in current directory
pnpm dlx wrangler init .
╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./.
│
# 카테고리 선택
# Select category
╰ What would you like to start with?
  ● Hello World example
  ○ Framework Starter
  ○ Application Starter
  ○ Template from a GitHub repo
  ◁ Go back

╰ Which template would you like to use?
  ● Worker only
  ○ Static site
  ○ SSR / full-stack app
  ○ Worker + Durable Objects
  ○ Worker + Durable Objects + Assets
  ○ Workflow
  ○ Scheduled Worker (Cron Trigger)
  ○ Queue consumer & producer Worker
  ○ API starter (OpenAPI compliant)
  ◁ Go back

# 언어 선택
# Select language
╰ Which language do you want to use?
  ○ TypeScript
  ● JavaScript
  ○ Python (beta)
  ◁ Go back

# 버전콘트롤 할지(Git)
# Version control (Git)
version control : yes
# 바로 배포할지
# Deploy immediately
deploy : no
```

## Development
개발

```sh
# 실행
# Run development server
pnpm run dev
```

## Frontend Setup
프론트엔드 설정

```sh
# frontend 생성
# Create frontend
pnpm create quasar@latest

 .d88888b.
d88P" "Y88b
888     888
888     888 888  888  8888b.  .d8888b   8888b.  888d888
888     888 888  888     "88b 88K          "88b 888P"
888 Y8b 888 888  888 .d888888 "Y8888b. .d888888 888
Y88b.Y8b88P Y88b 888 888  888      X88 888  888 888
 "Y888888"   "Y88888 "Y888888  88888P' "Y888888 888
       Y8b

? What would you like to build? › - Use arrow-keys. Return to submit.
❯   App with Quasar CLI, let's go! - spa/pwa/ssr/bex/electron/capacitor/cordova
    AppExtension (AE) for Quasar CLI
    Quasar UI kit
# frontend 폴더에 생성
# Create in frontend folder
? Project folder: › frontend

# 자바스크립트 선택
# Select JavaScript
? Pick script type: › - Use arrow-keys. Return to submit.
❯   Javascript
    Typescript

# Vite 선택
# Select Vite
? Pick Quasar App CLI variant: › - Use arrow-keys. Return to submit.
❯   Quasar App CLI with Vite - recommended
    Quasar App CLI with Webpack

# 패키지 이름 설정
# Set package name
? Package name: › com.companyname.myapp

# 프로젝트 이름
# Project name
✔ Project product name: (must start with letter if building mobile apps) … cloudflarefrontend

# 프로젝트 설명
# Project description
? Project description: › Frontend for cloudflare workers

# Vue Style 선택
# Select Vue style
? Pick a Vue component style: › - Use arrow-keys. Return to submit.
❯   Composition API with <script setup> - recommended
    Composition API
    Options API

# css style 선택
# Select CSS style
? Pick your CSS preprocessor: › - Use arrow-keys. Return to submit.
❯   Sass with SCSS syntax
    Sass with indented syntax
    None (the others will still be available)

# feature 선택 ( lint off, pinia on, axios on, i18n on)
# Select features (lint off, pinia on, axios on, i18n on)
? Check the features needed for your project: ›
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Linting (vite-plugin-checker + ESLint)
◉   State Management (Pinia)
◉   axios
◉   vue-i18n

# 패키지 매니저 선택
# Select package manager
? Install project dependencies? (recommended) › - Use arrow-keys. Return to submit.
❯   Yes, use pnpm
    No, I will handle that myself
```

## Configuration
구성 설정

* 프로젝트 폴더의 package.json에 scripts 키에 아래 항목 추가해서 클라이언트만 빌드하게 해줌
* Add the following item to the scripts key in package.json to build only the client

```json
"build": "pnpm --filter frontend build"
```

* wrangler.jsonc 에서 다음 항목 추가해서 프론트 엔드가 서비스 되도록 수정
* Add the following item in wrangler.jsonc to serve the frontend

```json
"assets": {
	"directory": "./frontend/dist/spa"
},
```

* 둘을 동시에 디버깅하기 위해서 launch.json을 수정(파일참고)
* Modify launch.json to debug both simultaneously (refer to file)

```

```sh
# 실행
pnpm run dev
```

```sh
# frontend 생성
pnpm create quasar@latest



 .d88888b.
d88P" "Y88b
888     888
888     888 888  888  8888b.  .d8888b   8888b.  888d888
888     888 888  888     "88b 88K          "88b 888P"
888 Y8b 888 888  888 .d888888 "Y8888b. .d888888 888
Y88b.Y8b88P Y88b 888 888  888      X88 888  888 888
 "Y888888"   "Y88888 "Y888888  88888P' "Y888888 888
       Y8b

? What would you like to build? › - Use arrow-keys. Return to submit.
❯   App with Quasar CLI, let's go! - spa/pwa/ssr/bex/electron/capacitor/cordova
    AppExtension (AE) for Quasar CLI
    Quasar UI kit
# frontend 폴더에 생성
? Project folder: › frontend

# 자바스크립트 선택
? Pick script type: › - Use arrow-keys. Return to submit.
❯   Javascript
    Typescript

# Vite 선택
? Pick Quasar App CLI variant: › - Use arrow-keys. Return to submit.
❯   Quasar App CLI with Vite - recommended
    Quasar App CLI with Webpack

# 패키지 이름 설정
? Package name: › com.companyname.myapp

# 프로젝트 이름
✔ Project product name: (must start with letter if building mobile apps) … cloudflarefrontend

# 프로젝트 설명
? Project description: › Frontend for cloudflare workers

# Vue Style 선택
? Pick a Vue component style: › - Use arrow-keys. Return to submit.
❯   Composition API with <script setup> - recommended
    Composition API
    Options API

# css style 선택
? Pick your CSS preprocessor: › - Use arrow-keys. Return to submit.
❯   Sass with SCSS syntax
    Sass with indented syntax
    None (the others will still be available)

# feature 선택 ( lint off, pinia on, axios on, i18n on)
? Check the features needed for your project: ›
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Linting (vite-plugin-checker + ESLint)
◉   State Management (Pinia)
◉   axios
◉   vue-i18n

# 패키지 매니저 선택
? Install project dependencies? (recommended) › - Use arrow-keys. Return to submit.
❯   Yes, use pnpm
    No, I will handle that myself
```

* 프로젝트 폴더의 package.json에 scripts 키에 아래 항목 추가해서 클라이언트만 빌드하게 해줌
```
		"build": "pnpm --filter frontend build"
```


* wrangler.jsonc 에서 다음 항목 추가해서 프론트 엔드가 서비스 되도록 수정
```
	"assets": {
		"directory": "./frontend/dist/spa"
	},
```

* 둘을 동시에 디버깅하기 위해서 launch.json을 수정(파일참고)
