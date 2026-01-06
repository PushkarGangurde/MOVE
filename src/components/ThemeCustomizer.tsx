import { Palette, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const accentColors = [
  { name: 'Amber', value: '35 80% 50%', class: 'bg-[hsl(35,80%,50%)]' },
  { name: 'Sage', value: '150 35% 45%', class: 'bg-[hsl(150,35%,45%)]' },
  { name: 'Ocean', value: '200 60% 45%', class: 'bg-[hsl(200,60%,45%)]' },
  { name: 'Lavender', value: '270 50% 55%', class: 'bg-[hsl(270,50%,55%)]' },
  { name: 'Rose', value: '350 60% 55%', class: 'bg-[hsl(350,60%,55%)]' },
  { name: 'Teal', value: '175 60% 40%', class: 'bg-[hsl(175,60%,40%)]' },
];

interface ThemeCustomizerProps {
  currentColor?: string;
  onColorChange: (color: string) => void;
}

export const ThemeCustomizer = ({ currentColor, onColorChange }: ThemeCustomizerProps) => {
  const applyColor = (colorValue: string) => {
    document.documentElement.style.setProperty('--primary', colorValue);
    document.documentElement.style.setProperty('--ring', colorValue);
    onColorChange(colorValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-3">
          <p className="text-sm font-medium">Accent Color</p>
          <div className="grid grid-cols-3 gap-2">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => applyColor(color.value)}
                className={cn(
                  'w-full aspect-square rounded-lg transition-all duration-200',
                  'flex items-center justify-center',
                  'hover:scale-105 hover:shadow-md',
                  'ring-2 ring-offset-2 ring-offset-background',
                  currentColor === color.value ? 'ring-foreground' : 'ring-transparent',
                  color.class
                )}
                title={color.name}
              >
                {currentColor === color.value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Click to change theme color
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
