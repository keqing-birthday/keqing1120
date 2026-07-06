import CountdownTimer from './CountdownTimer';
import Starfield from './Starfield';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Glass from './Glass';
import LiquidGlass from './LiquidGlass';

export default function HeroSection({
  titleImage,
  description,
  primaryButton,
  secondaryButton,
  slides,
}) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* 流动星云星空背景 */}
      <Starfield />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-20 pt-24 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center lg:items-start min-w-0 transition-all duration-300 ease-out">
          {/* 左侧文字 */}
          <div className="text-center lg:text-left min-w-0">
            <h1 className="mb-4 lg:mt-[5px]">
              <img
                src={titleImage.src}
                alt={titleImage.alt}
                className="w-full max-w-lg mx-auto lg:mx-0 h-auto transition-all duration-300 ease-out"
                width={1600}
                height={759}
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-lg mx-auto lg:mx-0 break-words transition-all duration-300 ease-out">
              {description}
            </p>
            <div className="flex flex-col [@media(min-width:375px)]:flex-row flex-wrap gap-3 [@media(min-width:375px)]:gap-4 justify-center lg:justify-start transition-all duration-300 ease-out">
              <Glass className="inline-block w-full [@media(min-width:375px)]:w-auto" cornerRadius={999}>
                <button
                  onClick={() => scrollTo(primaryButton.targetId)}
                  className="w-full [@media(min-width:375px)]:w-auto px-8 py-3 bg-keqing-purple hover:bg-purple-600 rounded-full font-bold text-white btn-glow"
                >
                  {primaryButton.text}
                </button>
              </Glass>
              <Glass className="inline-block w-full [@media(min-width:375px)]:w-auto" cornerRadius={999}>
                <button
                  onClick={() => scrollTo(secondaryButton.targetId)}
                  className="w-full [@media(min-width:375px)]:w-auto px-8 py-3 hover:bg-purple-900/30 rounded-full font-bold text-purple-300 hover:text-white btn-glow"
                >
                  {secondaryButton.text}
                </button>
              </Glass>
            </div>
          </div>

          {/* 右侧轮播 */}
          <div className="relative w-full max-w-full min-w-0 aspect-[4/5] md:aspect-square transition-all duration-300 ease-out">
            <LiquidGlass className="absolute inset-0 p-1 max-w-full max-h-full" cornerRadius={24}>
              <div className="w-full h-full rounded-[20px] overflow-hidden">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation
                  loop
                  className="w-full h-full max-w-full max-h-full"
                >
                  {slides.map(({ src, alt }, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                        width={768}
                        height={768}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </LiquidGlass>
          </div>
        </div>

        {/* 倒计时 */}
        <div className="mt-16 md:mt-24">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
