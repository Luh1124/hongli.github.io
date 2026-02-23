# Hong Li - Academic Homepage

这是我的个人学术主页（GitHub Pages），基于静态 HTML + Bootstrap 5 构建。

## 结构说明

- `index.html`: 主页面内容（About / Education / Research / News / Publications / Experience / Services）
- `assets/css/global.css`: 全站样式（主题色、卡片、论文列表、News 等）
- `assets/css/pubstyle.css`: 时间线（Intern Experience）样式
- `assets/js/common.js`: 交互脚本（滚动高亮、fade-in、back-to-top、News 折叠等）
- `assets/images/`: 头像、favicon、公司 logo 等图片资源
- `Projects/`: 论文/项目的 teaser 图片与资源文件（按项目建文件夹）

## 常见更新位置

### 1) 更新个人信息
编辑 `index.html` 的 `#about` 区域（姓名、邮箱、个人简介、求职状态、社交链接）。

### 2) 更新论文（Publications）
编辑 `index.html` 的 `#publications` 区域。

每篇论文通常包含：
- 缩略图：`Projects/<name>/teaser.(png|jpg|jpeg)`（或现有路径）
- 链接：`arxiv` / `paper` / `code` / `project`（按实际有的填）
- 作者、会议/期刊与年份

### 3) 更新 News
编辑 `index.html` 的 `#news` 区域。默认只显示前 4 条，其余可折叠展开。

### 4) 更新实习经历（Experience）
编辑 `index.html` 的 `#experience` 区域（时间、岗位、内容、Mentor）。

### 5) 更新 Academic Services
编辑 `index.html` 的 `#services` 区域（Reviewer 列表等）。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 8000
```

然后浏览器打开 `http://localhost:8000/`。


