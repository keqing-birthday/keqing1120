/**
 * 主题配置
 * =========
 * 改外观用的文件：全站配色、字体、毛玻璃风格、粒子特效、动画参数都在这。
 *
 * ★ 快速换主题色：只需改下面三个 accent 常量，全站按钮/链接/渐变/品牌色自动生效。★
 *
 * 浅色/深色模式分别定义在 colors.light 与 colors.dark 下，
 * 字段名会自动转换为 CSS 变量，例如 pageBg -> --page-bg。
 * 修改后保存，Vite 会自动重新生成 CSS 变量并注入到页面中。
 */

// ==================== 主题色（唯一来源） ====================
// 改这三个常量即可更换全站主色调；深色模式下如需更亮/更暗的变体，
// 请到 colors.dark 里单独调整。
const accentPurple = '#8a2be2'; // 主强调色：主按钮、链接、图标、Swiper 箭头
const accentPink = '#da70d6'; // 辅助强调色：渐变终点、悬停状态
const accentGold = '#ffd700'; // 高亮色：金色渐变文字、徽章

export const themeConfig = {
  // ==================== 主题预设 ====================
  // 通过修改 preset 字段，可以一键切换整站卡片风格。
  // 可选值：
  // - 'liquid-glass' : 液态玻璃（当前默认，带高光、反射、边缘）
  // - 'frosted-glass': 简约毛玻璃（仅 backdrop-filter 模糊 + 边框）
  // - 'opaque'       : 不透明卡片（无模糊，使用实色背景）
  // - 'minimal'      : 极简扁平（无模糊、无阴影、无内发光）
  preset: 'liquid-glass',

  // ==================== 颜色配置 ====================
  // 每个字段会生成对应的 CSS 变量，供 index.css、Tailwind 和 JSX 使用。
  colors: {
    // 浅色模式（日间模式 / :root）
    light: {
      // 页面背景色：整个网站的大背景
      pageBg: '#efe6f3',

      // 卡片背景色：玻璃卡片、内容卡片等的底色
      cardBg: 'rgba(255, 255, 255, 0.55)',

      // 卡片悬停背景色：鼠标移到卡片上时的底色
      cardBgHover: 'rgba(255, 255, 255, 0.72)',

      // 主要文字颜色：标题、正文等重要文字
      textPrimary: '#1d1d1f',

      // 次要文字颜色：说明文字、辅助信息等
      textSecondary: '#555560',

      // 强调紫色：主按钮、链接、图标、Swiper 箭头等主强调色（取顶部 accentPurple）
      accentPurple,

      // 强调粉色：渐变终点、悬停状态等辅助强调色（取顶部 accentPink）
      accentPink,

      // 强调金色：金色渐变文字、徽章等高亮元素（取顶部 accentGold）
      accentGold,

      // 边框颜色：卡片、组件等内部边框
      borderColor: 'rgba(255, 255, 255, 0.6)',

      // 外层边框颜色：更明显的外边框或分割线
      borderColorOuter: 'rgba(255, 255, 255, 0.85)',

      // 阴影颜色：卡片阴影、浮层阴影的底色
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },

    // 深色模式（夜间模式 / .dark）
    dark: {
      // 页面背景色：深色模式下的网站大背景
      pageBg: '#08081a',

      // 卡片背景色：深色模式下的玻璃卡片底色
      cardBg: 'rgba(55, 55, 95, 0.65)',

      // 卡片悬停背景色：深色模式下鼠标悬停时的卡片底色
      cardBgHover: 'rgba(70, 70, 120, 0.75)',

      // 主要文字颜色：深色模式下的标题、正文
      textPrimary: '#f0f0f5',

      // 次要文字颜色：深色模式下的说明文字
      textSecondary: '#c8c8d4',

      // 强调紫色：深色模式下通常比浅色模式更亮，可按需微调
      accentPurple: '#c58bff',

      // 强调粉色：深色模式下的辅助强调色
      accentPink: '#f0a0f0',

      // 强调金色：深色模式下的金色高亮
      accentGold: '#ffe847',

      // 边框颜色：深色模式下的组件边框
      borderColor: 'rgba(255, 255, 255, 0.28)',

      // 外层边框颜色：深色模式下的外边框
      borderColorOuter: 'rgba(255, 255, 255, 0.4)',

      // 阴影颜色：深色模式下的阴影（通常更深）
      shadowColor: 'rgba(0, 0, 0, 0.45)',
    },
  },

  // ==================== 首页专属配色 ====================
  // 这里集中管理首页 Hero、粒子动画等首页特有的视觉颜色。
  // 标量值（字符串/数字）会被 vite.config.js 转成 CSS 变量；
  // 数组值供组件直接 import 使用，不生成 CSS 变量。
  home: {
    hero: {
      // 星空星云颜色：控制 Hero 背景 Starfield 中三团星云的颜色
      nebula1: 'rgba(138, 43, 226, 0.22)',
      nebula2: 'rgba(218, 112, 214, 0.20)',
      nebula3: 'rgba(75, 0, 130, 0.18)',

      // 星星颜色：控制星空中闪烁星星的填充色
      starColor: 'rgba(255, 255, 255, 0.9)',

      // 星星光晕颜色：控制星星周围的发光颜色
      starGlow: 'rgba(255, 255, 255, 0.6)',

      // 星空背景：Hero 区 Starfield 的底层渐变背景
      background: 'radial-gradient(ellipse at bottom, #1b0a2e 0%, #0a0a1a 60%, #050510 100%)',

      // 主按钮背景色：Hero 区「立即加入」按钮（取主题色 accentPurple）
      primaryButtonBg: accentPurple,

      // 主按钮悬停背景色：鼠标移到主按钮上时的颜色
      primaryButtonHoverBg: '#9333ea',

      // 主按钮文字颜色
      primaryButtonText: '#ffffff',

      // 次按钮文字颜色：Hero 区「了解更多」按钮默认文字（取主题色 accentPink）
      secondaryButtonText: accentPink,

      // 次按钮悬停文字颜色
      secondaryButtonHoverText: '#ffffff',

      // 次按钮悬停背景色（通常带透明度）
      secondaryButtonHoverBg: 'rgba(147, 51, 234, 0.30)',
    },

    contentParticles: {
      // 浅色模式下内容区飘落的花瓣颜色
      light: ['#ffc0cb', '#ffb6c1', '#ff9eb5', '#ffd1dc'],

      // 深色模式下内容区上升的发光粒子颜色
      dark: ['#a855f7', '#8b5cf6', '#7c3aed'],

      // 深色模式下内容区背景雾气颜色
      mist: [
        'rgba(138, 43, 226, 0.22)',
        'rgba(124, 58, 237, 0.20)',
        'rgba(218, 112, 214, 0.18)',
        'rgba(147, 51, 234, 0.20)',
      ],
    },

    footerParticles: {
      // 页脚深色模式下飘落粒子的颜色
      colors: ['#ffd700', '#da70d6'],
    },
  },

  // ==================== 效果配置 ====================
  // 这里集中管理页面上的各种动效、粒子、动画参数以及开关。
  // 每个可独立开关的特效使用 status: 'enable' | 'disable' 控制。
  // 标量值（字符串/数字）会自动生成 CSS 变量供 index.css 使用；
  // 数组、对象由组件直接 import 读取。
  effects: {
    // 毛玻璃模糊半径：控制玻璃卡片、导航栏的 backdrop-filter 模糊程度
    glassBlur: {
      // 浅色模式下的模糊半径
      light: '12px',

      // 深色模式下的模糊半径（通常比浅色模式大一些，玻璃感更强）
      dark: '18px',
    },

    // 星空背景特效（Hero 区）
    starfield: {
      // 开关：'enable' 显示，'disable' 关闭
      status: 'enable',

      // 星星数量：桌面端与移动端
      starCount: { desktop: 45, mobile: 28 },

      // 星星大小范围（像素）
      starSize: { min: 0.8, max: 3.0 },

      // 闪烁动画参数
      twinkle: {
        // 单次闪烁周期范围（秒）
        durationMin: 1.5,
        durationMax: 3.5,
        // 最大延迟（秒）
        delayMax: 4,
      },

      // 漂移动画参数
      drift: {
        // 单次漂移周期范围（秒）
        durationMin: 20,
        durationMax: 45,
        // 漂移终点相对起点的位移（像素）
        distanceX: -60,
        distanceY: -120,
      },

      // 星云参数
      nebula: {
        // 星云模糊半径
        blur: '45px',
        // 星云不透明度
        opacity: 0.7,
        // 三团星云的位置、大小、漂移周期
        items: [
          { top: '5%', left: '15%', size: '55vw', duration: 12 },
          { top: '55%', left: '65%', size: '45vw', duration: 15 },
          { top: '35%', left: '45%', size: '60vw', duration: 18 },
        ],
      },
    },

    // 首页内容区粒子特效（浅色模式飘落花瓣，深色模式上升粒子 + 雾气 + 闪电）
    contentParticles: {
      // 开关
      status: 'enable',

      // 粒子数量
      particleCount: { desktop: 45, mobile: 25 },

      // 雾气数量
      mistCount: { desktop: 7, mobile: 3 },

      // 是否启用花瓣拖尾（仅桌面端）
      enableTrail: true,

      // 是否启用闪电（仅桌面端）
      enableLightning: true,

      // 移动端最大设备像素比
      maxDprMobile: 1.5,

      // 浅色模式花瓣参数
      petal: {
        sizeMin: 6,
        sizeMax: 10,
        speedYMin: 0.5,
        speedYMax: 1.4,
        // 水平速度随机范围（±speedXSpread）
        speedXSpread: 0.7,
        // 旋转速度随机范围（±rotationSpeedSpread）
        rotationSpeedSpread: 0.025,
        opacityMin: 0.75,
        opacityMax: 0.95,
        swayFrequencyMin: 0.004,
        swayFrequencyMax: 0.012,
        trailLengthMin: 10,
        trailLengthMax: 16,
      },

      // 深色模式上升粒子参数
      darkDot: {
        sizeMin: 2.5,
        sizeMax: 4.5,
        speedYMin: 0.2,
        speedYMax: 0.7,
        speedXSpread: 0.35,
        opacityMin: 0.35,
        opacityMax: 0.65,
      },

      // 雾气参数
      mist: {
        sizeMin: 260,
        sizeMax: 560,
        speedXSpread: 0.28,
        speedYSpread: 0.2,
      },

      // 闪电参数
      lightning: {
        // 首次出现前的等待帧数范围
        initialTimerMin: 120,
        initialTimerMax: 360,
        // 两次闪电之间的等待帧数范围
        recurrenceTimerMin: 240,
        recurrenceTimerMax: 600,
        // 主闪电偏移幅度、递归深度
        mainDisplacement: 160,
        mainDepth: 7,
        // 分支数量范围、分支偏移、分支深度
        branchCountMin: 2,
        branchCountMax: 3,
        branchDisplacement: 90,
        branchDepth: 5,
        // 闪电存续帧数范围
        maxAgeMin: 10,
        maxAgeMax: 18,
      },
    },

    // 页脚粒子特效（仅深色模式）
    footerParticles: {
      // 开关
      status: 'enable',

      // 粒子数量
      particleCount: { desktop: 28, mobile: 16 },

      // 最大设备像素比
      maxDpr: 2,

      // 粒子大小范围（像素）
      sizeMin: 0.5,
      sizeMax: 2.5,

      // 上升速度范围（像素/帧）
      speedYMin: 0.2,
      speedYMax: 1.0,

      // 水平速度随机范围（±speedXSpread）
      speedXSpread: 0.4,

      // 不透明度范围
      opacityMin: 0.2,
      opacityMax: 0.7,

      // 生命周期帧数范围
      lifeMin: 100,
      lifeMax: 200,
    },

    // CSS / JavaScript 微交互动效
    animations: {
      // 页面进入动画
      pageEnter: {
        status: 'enable',
        duration: '0.5s',
        distance: '24px',
        easing: 'ease-out',
      },

      // 按钮悬停发光 + 上浮
      buttonGlow: {
        status: 'enable',
        // 悬停上浮距离
        lift: '-3px',
        // 按下时回弹距离
        activeLift: '-1px',
        // 阴影扩散距离
        shadowSpread: '28px',
        // 发光层模糊半径
        shadowBlur: '12px',
      },

      // 玻璃卡片悬停上浮
      cardHover: {
        status: 'enable',
        lift: '-6px',
      },

      // 图标悬停缩放 + 旋转
      iconHover: {
        status: 'enable',
        scale: 1.12,
        rotate: '-4deg',
      },

      // 链接紫色光从左滑入
      linkGlow: {
        status: 'enable',
      },

      // 音乐播放器可视化条
      musicVisualizer: {
        status: 'enable',
        duration: '0.8s',
        barMinHeight: '20%',
        barMaxHeight: '100%',
      },
    },

    // 轮播图参数
    swiper: {
      // 自动播放间隔（毫秒）
      autoplayDelay: 5000,
    },

    // Toast 提示参数
    toast: {
      // 显示时长（毫秒）
      duration: 2500,
      // 退出动画时长（毫秒）
      exitDuration: 350,
    },
  },

  // ==================== 字体配置 ====================
  // 每个数组按优先级排列，前面的字体不存在时会依次回退。
  // 字体名称带空格时需要加引号。
  fonts: {
    // 标题字体：用于页面大标题、页脚品牌名等
    title: ['"LXGW Neo ZhiSong"', '"Noto Serif SC"', 'serif'],

    // 正文字体：用于正文、说明文字等
    body: ['"LXGW WenKai Lite"', '"Noto Serif SC"', 'serif'],
  },

  // ==================== 品牌色板 ====================
  // 主要用于 Tailwind 的 colors.keqing.*，例如 keqing-purple、keqing-gold。
  // 这部分也会供 JSX 中 arbitrary value（如 bg-keqing-purple）使用。
  brand: {
    // 品牌紫色（取主题色 accentPurple）
    purple: accentPurple,

    // 品牌粉色（取主题色 accentPink）
    pink: accentPink,

    // 品牌金色（取主题色 accentGold）
    gold: accentGold,

    // 品牌深色：最深背景色
    dark: '#0a0a1a',

    // 品牌次深色：稍浅一点的深色背景
    darkLight: '#1a0a2e',
  },
};
