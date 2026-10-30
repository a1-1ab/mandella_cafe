import cn from '../../lib/cn.js';
import Chip from '../ui/Chip.jsx';

const CategoryPills = ({ categories = [], value, onChange, tone = 'teal', className }) => (
  <div className={cn('flex gap-2 overflow-x-auto pb-1', className)}>
    {categories.map((category) => (
      <Chip
        key={category.value}
        tone={tone}
        active={value === category.value}
        onClick={() => onChange(category.value)}
      >
        {category.label}
      </Chip>
    ))}
  </div>
);

export default CategoryPills;
