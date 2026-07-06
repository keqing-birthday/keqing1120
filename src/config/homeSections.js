/**
 * 首页板块配置
 * =============
 * 通过修改这个文件即可控制首页各板块的显隐与内容。
 *
 * 每个板块字段说明：
 * - id: 板块唯一标识，不要修改
 * - status: 'enable' 显示，'disable' 隐藏
 * - title / description: 板块标题与副标题
 * - 其它字段根据板块类型不同而变化
 *
 * 新增板块时，请同时在 src/components/HomePage.jsx 的 sectionComponents 中注册对应的组件。
 */

export const homeSections = [
  {
    id: 'hero',
    status: 'enable',
    titleImage: {
      src: '/images/hero-title.png',
      alt: '刻晴生日会 需要你的加入',
    },
    description:
      '玉衡星刻晴的生日即将到来，我们正在筹备一场盛大的庆典。无论你是才华横溢的创作者，还是热情似火的粉丝，都欢迎加入我们！',
    primaryButton: {
      text: '立即加入',
      targetId: 'recruit',
    },
    secondaryButton: {
      text: '了解更多',
      targetId: 'contact',
    },
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
    qqGroup: '231786295',
    groupName: '玉衡一心定天衡',
  },
];
