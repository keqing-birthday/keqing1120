import { Palette, Video, Music, FileText, Gamepad2, Users } from 'lucide-react';
import Glass from './Glass';

const recruits = [
  {
    icon: Palette,
    title: '创意设计',
    desc: '海报、横幅、周边等视觉设计',
    skills: ['平面设计', '插画创作', 'UI/UX设计'],
  },
  {
    icon: Video,
    title: '视频制作',
    desc: '策划、拍摄、剪辑、后期',
    skills: ['视频剪辑', '动画/MMD', '特效处理'],
  },
  {
    icon: Music,
    title: '音乐创作',
    desc: '主题曲、BGM创作和制作',
    skills: ['作曲编曲', '歌词创作', '后期编辑'],
  },
  {
    icon: FileText,
    title: '文案策划',
    desc: '活动策划、文案、宣传推广',
    skills: ['活动策划', '文案撰写', '宣传推广'],
  },
  {
    icon: Gamepad2,
    title: '游戏专家',
    desc: '游戏素材产出、核爆、剧情',
    skills: ['核弹大数字', '游戏剧情', '深渊/剧场/危战'],
  },
  {
    icon: Users,
    title: '围观群众',
    desc: '没有特殊技能也能参与！',
    skills: ['活动参与', '宣传扩散', '提供建议'],
  },
];

export default function RecruitPanel() {
  return (
    <section id="recruit" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-title text-center mb-4 gradient-text">
          招募信息
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          刻晴生日会正在招募各方人才，无论你擅长什么，都能在这里找到属于你的位置！
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-out">
          {recruits.map(({ icon: Icon, title, desc, skills }, i) => (
            <Glass
              key={i}
              className="p-6 hover:transform hover:-translate-y-2 transition-all duration-300 group"
              cornerRadius={16}
            >
              <div className="w-12 h-12 rounded-xl bg-keqing-purple/10 dark:bg-keqing-purple/20 flex items-center justify-center mb-4 group-hover:bg-keqing-purple/20 dark:group-hover:bg-keqing-purple/30 transition-colors">
                <Icon size={24} className="text-keqing-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, j) => (
                  <span
                    key={j}
                    className="skill-tag px-3 py-1 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}
