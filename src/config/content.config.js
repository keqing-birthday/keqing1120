/**
 * 页面内容配置
 * ============
 * ★ 组员最常改的文件：文案、图片、贡献者名单、招募信息、音乐、页脚都在这。★
 *
 * 站点名 / 组名 / QQ 群号 / 生日日期 / 备案号在 site.config.js 中配置，
 * 不要在本文档里重复填写。
 *
 * 首页板块说明：
 * - id: 板块唯一标识，不要修改（新增板块时，请同时在 src/pages/HomePage.jsx 的
 *   sectionComponents 中注册对应组件）
 * - status: 'enable' 显示，'disable' 隐藏
 * - 其它字段根据板块类型不同而变化，见各板块注释
 */

// ==================== 首页板块 ====================

export const homeSections = [
  {
    id: 'hero',
    status: 'enable',
    titleImage: {
      // 首页大标题图（建议透明底 PNG）
      src: '/images/hero-title.png',
      alt: '刻晴生日会 需要你的加入',
    },
    description:
      '玉衡星刻晴的生日即将到来，我们正在筹备一场盛大的庆典。无论你是才华横溢的创作者，还是热情似火的粉丝，都欢迎加入我们！',
    primaryButton: {
      text: '立即加入',
      // 点击后平滑滚动到的板块 id（对应下方 recruit 板块）
      targetId: 'recruit',
    },
    secondaryButton: {
      text: '了解更多',
      targetId: 'contact',
    },
    // 右侧轮播图：历年生日贺图，按需增删
    slides: [
      { src: '/images/birthday-2021.jpg', alt: '2021年刻晴生日' },
      { src: '/images/birthday-2022.jpg', alt: '2022年刻晴生日' },
      { src: '/images/birthday-2023.jpg', alt: '2023年刻晴生日' },
      { src: '/images/birthday-2024.jpg', alt: '2024年刻晴生日' },
    ],
  },
  {
    id: 'coreContributors',
    status: 'enable',
    title: '核心贡献者',
    description: '感谢每一位为刻晴生日会付出心血的老师，排名不分先后。',
    viewAllText: '查看全部',
    // 首页展示的核心成员；完整名单见下方 allContributors
    contributors: [
      {
        name: '我家晴宝不可能这么可爱',
        role: '主办',
        avatar: '/images/direct.webp',
        bilibili: 'https://space.bilibili.com/3546695900072565',
      },
      {
        name: '三代',
        role: '三维动画与导播',
        avatar: '/images/b_bfa0f2a5341561b777411c5044f160e9.jpg',
        bilibili: 'https://space.bilibili.com/1418606',
      },
      {
        name: 'ink ECY',
        role: '剧场与同人作者',
        avatar: '/images/b_b1c20e6b96481e6271ac9cc1404061e1.jpg',
        bilibili: 'https://space.bilibili.com/1740529490',
      },
      {
        name: '一条梦醒的鱼',
        role: '剪辑/七圣召唤',
        avatar: '/images/f377c50438d10e713facbc468e41310a.png',
        bilibili: 'https://space.bilibili.com/348817613',
      },
      {
        name: '玉衡星织',
        role: '数字影像工程师',
        avatar: '/images/026-06-25_220956_592.jpg',
        bilibili: 'https://space.bilibili.com/3493106890574497',
      },
      {
        name: 'AngelNeko橙',
        role: '音乐制作',
        avatar: '/images/98CFC6FEF95864A7EA6C7BA5676E322A.jpg',
        bilibili: 'https://space.bilibili.com/205873966',
      },
    ],
  },
  {
    id: 'recruit',
    status: 'enable',
    title: '招募信息',
    description:
      '刻晴生日会正在招募各方人才，无论你擅长什么，都能在这里找到属于你的位置！',
    // icon 填 lucide 图标名，常用：Palette Video Music FileText Gamepad2 Users Camera PenTool Mic Wrench Sparkles
    items: [
      {
        icon: 'Palette',
        title: '创意设计',
        desc: '海报、横幅、周边等视觉设计',
        skills: ['平面设计', '插画创作', 'UI/UX设计'],
      },
      {
        icon: 'Video',
        title: '视频制作',
        desc: '策划、拍摄、剪辑、后期',
        skills: ['视频剪辑', '动画/MMD', '特效处理'],
      },
      {
        icon: 'Music',
        title: '音乐创作',
        desc: '主题曲、BGM创作和制作',
        skills: ['作曲编曲', '歌词创作', '后期编辑'],
      },
      {
        icon: 'FileText',
        title: '文案策划',
        desc: '活动策划、文案、宣传推广',
        skills: ['活动策划', '文案撰写', '宣传推广'],
      },
      {
        icon: 'Gamepad2',
        title: '游戏专家',
        desc: '游戏素材产出、核爆、剧情',
        skills: ['核弹大数字', '游戏剧情', '深渊/剧场/危战'],
      },
      {
        icon: 'Users',
        title: '围观群众',
        desc: '没有特殊技能也能参与！',
        skills: ['活动参与', '宣传扩散', '提供建议'],
      },
    ],
  },
  {
    id: 'contact',
    status: 'enable',
    title: '联系方式',
    description: '加入我们的社区，获取最新资讯和活动信息！',
    // 注意：QQ 群号与组名在 site.config.js 中配置，这里只改标题和描述
  },
];

// ==================== 全部贡献者名单（/contributors 页面） ====================
// 字段说明：
// - name：昵称
// - role：职位 / 负责内容
// - avatar：头像图片地址（建议放在 public/images/ 下，如 '/images/contributor-xxx.png'）
// - bilibili：B站个人空间链接，留空或 '#' 表示暂不跳转

export const allContributors = [
  { name: '我家晴宝不可能这么可爱', role: '主办', avatar: '/images/direct.webp', bilibili: 'https://space.bilibili.com/3546695900072565' },
  { name: '三代', role: '三维动画与导播', avatar: '/images/b_bfa0f2a5341561b777411c5044f160e9.jpg', bilibili: 'https://space.bilibili.com/1418606' },
  { name: 'ink ECY', role: '剧场与同人作者', avatar: '/images/b_b1c20e6b96481e6271ac9cc1404061e1.jpg', bilibili: 'https://space.bilibili.com/1740529490' },
  { name: '一条梦醒的鱼', role: '剪辑/七圣召唤', avatar: '/images/f377c50438d10e713facbc468e41310a.png', bilibili: 'https://space.bilibili.com/348817613' },
  { name: '艺人小D桑', role: '翻唱/剪辑', avatar: '/images/9a0db07de8e97087eb9a1cd27b8067a7.jpg', bilibili: 'https://space.bilibili.com/442724416' },
  { name: '蔷薇少女祥瑞', role: '剪纸/同人作者', avatar: '/images/E3755DF02E646EAFE3C278F7C9224CA0.png', bilibili: 'https://space.bilibili.com/502562714' },
  { name: '玉衡星织', role: '数字影像工程师', avatar: '/images/026-06-25_220956_592.jpg', bilibili: 'https://space.bilibili.com/3493106890574497' },
  // 在此继续添加更多贡献者
  // { name: '示例昵称', role: '示例职位', avatar: '/images/xxx.jpg', bilibili: '' },
];

// ==================== 音乐播放器歌单 ====================
// 歌曲文件放在 public/music/ 下；封面图放在 public/images/ 下。
// 按顺序播放，可添加多首。

export const playlist = [
  {
    id: 1,
    title: '刻晴赋',
    artist: '夏翊然',
    src: '/music/keqing-fu.mp3',
    cover: '/images/music-cover.jpg',
  },
];

// ==================== 页脚配置 ====================
// 每个区块：status 'enable' 显示 / 'disable' 隐藏。
// 制作组信息与备案号自动生成自 site.config.js，无需在此填写。

export const footerConfig = {
  // 页脚品牌名：显示 site.config.js 的 siteName
  brand: {
    status: 'enable',
  },
  tagline: {
    status: 'enable',
    text: '玉衡一心定天衡 · 生贺组作品',
  },
  description: {
    status: 'enable',
    text: '本站为原神角色「刻晴」同人生日庆祝活动页面，非官方内容',
  },
  // 「由 xx 制作 · QQ群：xxxx」自动生成自 site.config.js
  credits: {
    status: 'enable',
  },
  copyright: {
    status: 'enable',
    text: '© 2026 Keqing Birthday Fan Project. All rights reserved.',
  },
  // 版本号自动读取 package.json，无需手动维护
  version: {
    status: 'enable',
  },
  disclaimers: {
    status: 'enable',
    items: [
      '本网站为同人作品，所涉及的官方游戏角色、图像、音乐等素材版权归米哈游所有。',
      'Genshin Impact and Keqing are trademarks of miHoYo/HoYoverse. This is a fan-made project and is not affiliated with miHoYo.',
    ],
  },
};
