import CountdownTimer from './CountdownTimer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Glass from './Glass';

const slides = [
  { img: '/images/birthday-2021.jpg', alt: '2021年刻晴生日' },
  { img: '/images/birthday-2022.jpg', alt: '2022年刻晴生日' },
  { img: '/images/birthday-2023.jpg', alt: '2023年刻晴生日' },
  { img: '/images/birthday-2024.jpg', alt: '2024年刻晴生日' },
];

export default function HeroSection() {
  const scrollToRecruit = () => {
    document.getElementById('recruit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-keqing-dark via-keqing-dark-light to-purple-950 z-0" />

      {/* 粒子背景（简化版，用CSS） */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-300" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-20 pt-24 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center lg:items-start min-w-0 transition-all duration-300 ease-out">
          {/* 左侧文字 */}
          <div className="text-center lg:text-left min-w-0">
            <h1 className="mb-4 lg:mt-[5px]">
              <img
                src="/images/hero-title.png"
                alt="2026刻晴生日会 需要你的加入"
                className="w-full max-w-lg mx-auto lg:mx-0 h-auto transition-all duration-300 ease-out"
                width={1600}
                height={760}
                loading="eager"
              />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 break-words transition-all duration-300 ease-out">
              璃月七星玉衡星刻晴的生日即将到来，我们正在筹备一场盛大的庆典。
              无论你是才华横溢的创作者，还是热情似火的粉丝，都欢迎加入我们！
            </p>
            <div className="flex flex-col [@media(min-width:375px)]:flex-row flex-wrap gap-3 [@media(min-width:375px)]:gap-4 justify-center lg:justify-start transition-all duration-300 ease-out">
              <Glass className="inline-block w-full [@media(min-width:375px)]:w-auto" cornerRadius={999}>
                <button
                  onClick={scrollToRecruit}
                  className="w-full [@media(min-width:375px)]:w-auto px-8 py-3 bg-keqing-purple hover:bg-purple-600 rounded-full font-bold transition-all transform hover:scale-105 text-white"
                >
                  立即加入
                </button>
              </Glass>
              <Glass className="inline-block w-full [@media(min-width:375px)]:w-auto" cornerRadius={999}>
                <button
                  onClick={scrollToContact}
                  className="w-full [@media(min-width:375px)]:w-auto px-8 py-3 hover:bg-purple-900/30 rounded-full font-bold transition-all text-purple-300 hover:text-white"
                >
                  了解更多
                </button>
              </Glass>
            </div>
          </div>

          {/* 右侧轮播 */}
          <div className="relative w-full max-w-full min-w-0 aspect-[4/5] md:aspect-square transition-all duration-300 ease-out">
            <Glass className="absolute inset-0 p-1 max-w-full max-h-full" cornerRadius={24}>
              <div className="w-full h-full rounded-[20px] overflow-hidden">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation
                  loop
                  className="w-full h-full max-w-full max-h-full"
                >
                  {slides.map(({ img, alt }, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={alt}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Glass>
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