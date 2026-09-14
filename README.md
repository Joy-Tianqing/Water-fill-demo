# 满一点 · Water Fill

M0 单关验证：透明试接 → 不透明正式挑战 → 余水落完后直接评级。

直接打开 `index.html`，无构建步骤、外部依赖或服务器要求。先完成一次透明试接才能进入正式关；每轮只能关水一次，重试会清空。正式关不显示水位，溢出判 F。切后台或严重长帧会中断本轮，不评级。

## 开发

- `src/core.js`：L01 整数水量核心、启动与关闭积分、余水、评级。
- `src/template.html`：Canvas 画面及阶段交互。
- `python3 scripts/build.py`：内联生成带 CSP 的单文件 `index.html`。
- `node tests/core.cjs`：边界、水量守恒及帧率回放。
- `node tests/ui.cjs`：模拟 DOM 的交互流程测试，不替代浏览器视觉验收。

## 文档

- [M0 实现与验收记录](docs/m0-validation.md)
- [PRD v0.2](docs/PRD-v0.2.md)
- [Web 技术方案](docs/web-technical-design.md)
- [iOS 技术方案](docs/ios-technical-design.md)

仓库根目录可作为 GitHub Pages 发布源。
