/**
 * 页脚配置
 * =========
 * 通过修改这个文件即可控制页脚各部分的文字内容及其显隐。
 *
 * 每个区块字段说明：
 * - status: 'enable' 显示，'disable' 隐藏
 * - text / title / items: 对应区块的内容
 */

export const footerConfig = {
  brand: {
    status: 'enable',
    title: '刻晴生日会',
  },
  tagline: {
    status: 'enable',
    text: '玉衡一心定天衡 · 生贺组作品',
  },
  description: {
    status: 'enable',
    text: '本站为原神角色「刻晴」同人生日庆祝活动页面，非官方内容',
  },
  credits: {
    status: 'enable',
    text: '由刻晴生贺组「玉衡一心定天衡」制作 · QQ群：231786295',
  },
  copyright: {
    status: 'enable',
    text: '© 2026 Keqing Birthday Fan Project. All rights reserved.',
  },
  version: {
    status: 'enable',
    text: '版本号 v2.1.0',
  },
  icp: {
    status: 'enable',
    text: '萌ICP备20261127号',
    href: 'https://icp.gov.moe/?keyword=20261127',
  },
  disclaimers: {
    status: 'enable',
    items: [
      '本网站为同人作品，所涉及的官方游戏角色、图像、音乐等素材版权归米哈游所有。',
      'Genshin Impact and Keqing are trademarks of miHoYo/HoYoverse. This is a fan-made project and is not affiliated with miHoYo.',
    ],
  },
};
