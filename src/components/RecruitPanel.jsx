import { Palette, Video, Music, FileText, Gamepad2, Users } from 'lucide-react';
import LiquidGlass from './LiquidGlass';

const iconMap = {
  Palette,
  Video,
  Music,
  FileText,
  Gamepad2,
  Users,
};

export default function RecruitPanel({ title, description, items = [] }) {
  return (
    <section id="recruit" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-title text-center mb-4 gradient-text">
          {title}
        </h2>
        <p className="text-center text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-out">
          {items.map(({ icon, title, desc, skills = [] }, i) => {
            const Icon = iconMap[icon] || Users;
            return (
              <LiquidGlass
                key={i}
                className="p-6 transition-all duration-300 group glass-card-hover"
                cornerRadius={16}
              >
                <div className="w-12 h-12 rounded-xl bg-keqing-purple/10 dark:bg-keqing-purple/20 flex items-center justify-center mb-4 group-hover:bg-keqing-purple/20 dark:group-hover:bg-keqing-purple/30 transition-colors icon-hover">
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
              </LiquidGlass>
            );
          })}
        </div>
      </div>
    </section>
  );
}
