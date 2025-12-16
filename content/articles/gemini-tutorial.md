---
title: 新鲜出炉，手把手教你使用 Gemini CLI
description: gemini
date: "2025-12-16"
published: true
repository: cater/homepage
---
# 新鲜出炉，手把手教你使用 Gemini CLI

[zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/1921720048638197772) 燕十三智能物联网云平台嵌入式开发工程师关注他

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fpic3.zhimg.com%2Fv2-22933a2c7fe214f7030d0384e30eddca_1440w.jpg&valid=false)

[Gemini CLI](https://zhida.zhihu.com/search?content_id=259605261&content_type=Article&match_order=1&q=Gemini+CLI&zhida_source=entity) 是 google 推出的基于 Gemini 2.5 Pro 模型的开源命令行界面工具，和 [claude code](https://zhida.zhihu.com/search?content_id=259605261&content_type=Article&match_order=1&q=claude+code&zhida_source=entity) 体验比较接近，但是是开源的，源码开放在 [https://github.com/google-gemini/gemini-cli](https://link.zhihu.com/?target=https%3A//github.com/google-gemini/gemini-cli)，已经有 25.1K star，377 个 issue，1.7K Fork, 77个 Pull requests (截止2025-6-25日晚)，非常活跃，采用的是 Apache 2.0 许可证。

为什么这 2 天更大专业介绍 AI 编程的大佬都在写文章推荐 Gemini CLI 呢？ 1. Gemini CLI 的核心是Gemini 2.5 Pro，这是一个能够处理多达 100 万个 token 的多模态基础模型，允许开发者输入大型代码库、文档和文件树，进行全面的多步骤分析或转换。

1. 史上最慷慨免费额度：个人用户通过谷歌账号登录，即可获得 Gemini 2.5 Pro 的使用权，享有 100 万 Token 的上下文窗口，以及 每分钟 60 次、每天 1000 次 的模型请求额度。

其他关于 Gemini CLI 强大的可以自己在各大科技公众号里面找到，这里不多赘述。

官方介绍在 [https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent](https://link.zhihu.com/?target=https%3A//blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent)，我还是比较喜欢看官方的。

### npm 安装

### node 和 npm 安装

[Node.js](https://zhida.zhihu.com/search?content_id=259605261&content_type=Article&match_order=1&q=Node.js&zhida_source=entity) 是一个跨平台的 JavaScript 运行环境，它构建在为了在服务器端运行JavaScript代码而设计的 Chrome JavaScript 上。它通常被用来构建后端应用，但是它也是非常流行的全栈和前端解决方案。 中文官网地址：[https://nodejs.org/zh-cn](https://link.zhihu.com/?target=https%3A//nodejs.org/zh-cn)

npm（node package manager）是 nodejs 的包管理器，用于 node 插件管理（包括安装、卸载、管理依赖等）

1. 方式1：通过 apt-get 安装 在命令行中输入：

    $ sudo apt-get update
    $ sudo apt-get install nodejs npm -y

1. 方式2：手工安装 在命令行中输入：

    $ wget https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz
    $ tar xvf node-v18.12.1-linux-x64.tar.xz
    $ sudo mkdir -p /usr/local/node
    $ sudo mv node-v18.12.1-linux-x64/* /usr/local/node

1. 创建软链接：

    $ sudo ln -s /usr/local/node/bin/node /usr/bin/node
    $ sudo ln -s /usr/local/node/bin/npm /usr/bin/npm

1. 安装完成后查看一下版本号，输入：

    $ node -v
    $ npm -v

### node 更新

使用 apt-get 安装的版本可能不是最新版本的 Node.js，可以和官网上的最新正式版本对照一下。（我安装的时候最新版本为 v18.12.1）

非最新版本会在实际使用中遇到较多问题，所以先将 Nodejs 升级到最新版本，使用 node 升级神器 n。（n 不支持 windows 系统）

1. 安装n，在命令行输入：

    $ sudo npm install -g n
    $ sudo ln -s /usr/local/node/bin/n /usr/bin/n

1. 安装完成后查看n的版本号：

    $ n -V

1. n 操作说明
2. sudo n 版本号 //安装指定 node版本
3. sudo n rm 版本号 //卸载指定 node版本
4. sudo n 版本号 //切换 node版本（不会删除已安装的其他版本）
5. sudo n latest // 使用或安装最新的官方发布
6. sudo n stable // 使用或安装稳定的正式版本
7. sudo n lts // 使用或安装最新的LTS正式版本  
8. 更新 node 到稳定的正式版本，输入：`sudo n stable` 再次输入：`node -v` 确认版本号是否为 `v24.3.0`  

### gemini-cli 安装与升级

Gemini CLI 使用 TypeScript 编写，可在所有平台上运行，包括 Windows、macOS 和 Linux。通过 npm 进行安装非常简单，使得开发者无论使用何种操作系统都能轻松访问。

### 安装

我选择全局安装，以便在任何地方都能直接使用 `gemini` 命令。在命令行终端执行以下命令：

    $ npm install -g @google/gemini-cli

安装环境要求：Node.js version 18 or higher installed.

### 升级

gemini-cli 更新很快，可以根据登录后的更新提示进行升级。运行以下命令进行升级：

    $ npm install -g @google/gemini-cli

> 如遇到权限问题，请加入 sudo 命令。

### 运行与登录

1. 运行 gemini 命令，就可以看到 gemini-cli 的欢迎界面。

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fpic1.zhimg.com%2Fv2-6717432449f117d6dce6f784c9fd71a8_1440w.jpg&valid=false)

首次运行时，它会提示你选择一个喜欢的主题颜色，这个主题颜色后续还可以通过 `/theme` 命令进行修改。
> 特别提醒，由于首次登录要进行谷歌账号登录，一定要再有桌面的命令行中启动 `gemini` 命令，否则会一直登录失败，而且目前 `gemini` 没有明确的提示，只是给了你一个链接。

1. 选择登录方式，这里我们选择使用谷歌账号登录。

    Select Auth Method
    │ ● Login with Google
    │ ○ Gemini API Key
    │ ○ Vertex AI

运行登录命令后，会自动打开浏览器，跳转到登录页面，使用谷歌账号登录即可。

如果通过 ssh 方式登录的小伙伴，等待半天后你会收获一个超时的提示， `Authentication timed out. Please try again.`，然后给你一个网址 [https://github.com/google-gemini/gemini-cli/blob/main/docs/tos-privacy.md](https://link.zhihu.com/?target=https%3A//github.com/google-gemini/gemini-cli/blob/main/docs/tos-privacy.md)，你会很懵逼，怎么登录，我上哪里输入我的 goolge 账号？
> 再次重申：前面安装环节我已经特别提醒过，一定要在桌面终端中运行 gemini 命令，否则会一直登录失败。
![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fpic2.zhimg.com%2Fv2-cffbc83d93b2afa6bf3bab9916145ad5_1440w.jpg&valid=false)

如果这一步登录失败，提示：`Login Failed: "Ensure your Google account is not a Workspace account"` 的话，这是因为你的 google 账号绑定了 Google Cloud，导致被误判成了 Workspace 账号。

有两种解决方案：

1. 更换未绑定 Google Cloud 的账号
2. 访问 [https://console.cloud.google.com](https://link.zhihu.com/?target=https%3A//console.cloud.google.com/) 可以查看你的项目编号，

![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fpic3.zhimg.com%2Fv2-a9387f172b653bd1d63483d86d5ea60e_1440w.jpg&valid=false)

然后将获取到的项目设置环境变量：`export GOOGLE_CLOUD_PROJECT="项目编号"`，也可以直接写入 `~/.bashrc` 或 `~/.zshrc` 文件中，然后重新登录 gemini 命令即可。

然后就可以通过 ssh 连接登录，然后就可以愉快地玩耍了。
![](https://cubox.pro/c/filters:no_upscale()?imageUrl=https%3A%2F%2Fpic2.zhimg.com%2Fv2-c55368486d54cde5b93ece2929cb147b_1440w.jpg&valid=false)

### 命令宝典

为了让我们能最大限度地发挥 Gemini CLI 的威力，简单整理了 gemini-cli 的常用命令，官方有详细的介绍，可在 [https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md](https://link.zhihu.com/?target=https%3A//github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md) 获取，以下文档是通过 gemini-cli 翻译后整理。

gemini-cli 的命令分为3种：/ 命令、 @ 命令 和 ! 命令。

1. / 命令：会话与元控制，这类命令用于控制 CLI 本身的行为，管理会话和设置。  
2. /help 或 /?：显示帮助信息，列出所有可用命令。  
3. /chat save：保存当前的对话历史，并打上一个标签，方便后续恢复。
4. /chat resume：从之前保存的某个标签恢复对话。
5. /chat list：列出所有已保存的对话标签。
6. /compress：用一段摘要来替换整个聊天上下文。在进行了长篇对话后，这个命令可以帮你节省大量的 Token，同时保留核心信息。
7. /memory show：显示当前从所有 GEMINI.md 文件中加载的分层记忆内容。
8. /memory refresh：重新从 GEMINI.md 文件加载记忆，当你修改了配置文件后非常有用。
9. /restore \[tool_call_id\]：撤销上一次工具执行所做的文件修改。这是一个「后悔药」功能，需要在使用 gemini 命令时加上 --checkpointing 标志来开启。
10. /stats：显示当前会话的详细统计信息，包括 Token 使用量、会话时长等。
11. /theme：打开主题选择对话框。
12. /clear (快捷键 Ctrl+L)：清空终端屏幕。
13. /quit 或 /exit：退出 Gemini CLI。  
14. @ 命令：注入文件与目录上下文  
15. @：将指定文件的内容注入到你的 Prompt 中。例如：What is this file about? @README.md  
16. @：将指定目录及其子目录下所有（未被 gitignore 的）文本文件的内容注入。  
17. ! 命令：与你的 Shell 无缝交互 这让你无需退出 Gemini CLI 就能执行系统命令。  
18. !：执行单条 Shell 命令，并返回到 Gemini CLI。例如：!ls -la 或 !git status。  
19. ! (单独输入)：切换到「Shell 模式」。在此模式下，你输入的任何内容都会被直接当作 Shell 命令执行，终端提示符也会变色以作区分。再次输入 ! 可以退出 Shell 模式，回到与 AI 的对话中。

命令不熟悉没关系，随时输入 /help 查看。

    /help
    Basics:                                                                                                                                                                          │
    │ Add context: Use @ to specify files for context (e.g., @src/myFile.ts) to target specific files or folders.                                                                      │
    │ Shell mode: Execute shell commands via ! (e.g., !npm run start) or use natural language (e.g. start server).                                                                     │
    │                                                                                                                                                                                  │
    │ Commands:                                                                                                                                                                        │
    │  /help - for help on gemini-cli                                                                                                                                                  │
    │  /docs - open full Gemini CLI documentation in your browser                                                                                                                      │
    │  /clear - clear the screen and conversation history                                                                                                                              │
    │  /theme - change the theme                                                                                                                                                       │
    │  /auth - change the auth method                                                                                                                                                  │
    │  /editor - set external editor preference                                                                                                                                        │
    │  /stats - check session stats                                                                                                                                                    │
    │  /mcp - list configured https://zhida.zhihu.com/search?content_id=259605261&content_type=Article&match_order=1&q=MCP&zhida_source=entity servers and tools                                                                                                                                    │
    │  /memory - manage memory. Usage: /memory <show|refresh|add> [text for add]                                                                                                       │
    │  /tools - list available Gemini CLI tools                                                                                                                                        │
    │  /about - show version info                                                                                                                                                      │
    │  /bug - submit a bug report                                                                                                                                                      │
    │  /chat - Manage conversation history. Usage: /chat <list|save|resume> [tag]                                                                                                      │
    │  /quit - exit the cli                                                                                                                                                            │
    │  /compress - Compresses the context by replacing it with a summary.                                                                                                              │
    │  ! - shell command                                                                                                                                                               │
    │                                                                                                                                                                                  │
    │ Keyboard Shortcuts:                                                                                                                                                              │
    │ Enter - Send message                                                                                                                                                             │
    │ Shift+Enter - New line                                                                                                                                                           │
    │ Up/Down - Cycle through your prompt history                                                                                                                                      │
    │ Alt+Left/Right - Jump through words in the input                                                                                                                                 │
    │ Esc - Cancel operation                                                                                                                                                           │
    │ Ctrl+C - Quit application

1. 一些小技巧：
2. shift+table ：切换手动确认和自动修改模式
