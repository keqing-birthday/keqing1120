import FooterParticles from './FooterParticles';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-gray-200/20 dark:border-gray-800/20 overflow-hidden">
      <FooterParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <p className="text-gray-400 dark:text-gray-300 mb-2">
          <span className="font-title text-2xl gradient-text">刻晴生日会</span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          璃月七星玉衡星 · 生贺组作品
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-400 mb-4">
          本站为原神角色「刻晴」同人生日庆祝活动页面，非官方内容
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-400 mb-6">
          由刻晴生贺组「玉衡一心定天衡」制作 · QQ群：231786295
        </p>
        <div className="text-xs text-gray-400 dark:text-gray-400">
          <p>© 2026 Keqing Birthday Fan Project. All rights reserved.</p>
          <p className="mt-1">
            Genshin Impact and Keqing are trademarks of miHoYo/HoYoverse.
            This is a fan-made project and is not affiliated with miHoYo.
          </p>
        </div>
      </div>
    </footer>
  );
}