/**
 * 全部贡献者名单（/contributors 页面专用）
 * 修改这个文件即可增删改全部贡献者，不会与首页的「核心贡献者」混淆。
 *
 * 字段说明：
 * - name：昵称
 * - role：职位 / 负责内容
 * - avatar：头像图片地址（建议放在 public/images/ 下，如 '/images/contributor-xxx.png'）
 * - bilibili：B站个人空间链接，留空或 '#' 表示暂不跳转
 */
export const allContributors = [
  { name: '玉衡星家的厨子(刻晴厨)', role: '主办', avatar: '/images/direct.webp', bilibili: 'https://space.bilibili.com/3546695900072565' },
  { name: '三代', role: '三维动画与导播', avatar: '/images/b_bfa0f2a5341561b777411c5044f160e9.jpg', bilibili: 'https://space.bilibili.com/1418606' },
  { name: 'ink ECY', role: '剧场与同人作者', avatar: '/images/b_b1c20e6b96481e6271ac9cc1404061e1.jpg', bilibili: 'https://space.bilibili.com/1740529490' },
  { name: '无事发生之晴', role: '剪辑/七圣召唤', avatar: '', bilibili: '' },
  // 在此继续添加更多贡献者
  // { name: '示例昵称', role: '示例职位', avatar: '/images/xxx.jpg', bilibili: '' },
];
