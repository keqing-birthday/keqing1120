import { useTheme } from '../context/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';
import Glass from './Glass';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const modes = [
    { id: 'light', icon: Sun, label: '浅色' },
    { id: 'dark', icon: Moon, label: '深色' },
    { id: 'system', icon: Monitor, label: '跟随系统' },
  ];

  return (
    <Glass className="inline-flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1" cornerRadius={999}>
      {modes.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`p-1.5 sm:p-2 rounded-full transition-all ${
            theme === id
              ? 'bg-keqing-purple text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-keqing-purple dark:hover:text-keqing-purple'
          }`}
          title={id}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      ))}
    </Glass>
  );
}
