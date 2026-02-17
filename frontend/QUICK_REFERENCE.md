# Quick Reference Guide

## 🎨 Component Usage

### Button
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary | secondary | outline | ghost | danger
// Sizes: sm | md | lg
// Props: isLoading, fullWidth, disabled
```

### Input
```tsx
import { Input } from './components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  helperText="We'll never share your email"
  leftIcon={<MailIcon />}
  required
/>
```

### Select
```tsx
import { Select } from './components/ui/Select';

<Select
  label="Status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  value={status}
  onChange={(e) => setStatus(e.target.value)}
/>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';

<Card hoverable interactive onClick={handleClick}>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description goes here</p>
  </CardContent>
</Card>

// Props: variant, padding, hoverable, interactive
```

### Modal
```tsx
import { Modal } from './components/ui/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure?</p>
  <Button onClick={() => setIsOpen(false)}>Confirm</Button>
</Modal>

// Sizes: sm | md | lg | xl | full
```

### Toast
```tsx
import { useToastStore } from './store';

const { addToast } = useToastStore();

addToast({
  type: 'success',
  message: 'Operation successful!',
  duration: 3000  // optional, default 5000ms
});

// Types: success | error | info | warning
```

### Skeleton
```tsx
import { Skeleton, ProjectCardSkeleton } from './components/ui/Skeleton';

<Skeleton className="w-full h-4" />
<Skeleton variant="circular" className="w-10 h-10" />
<ProjectCardSkeleton />  // Pre-built project card skeleton
```

## 🎯 State Management

### Zustand Store
```tsx
import { useToastStore, useDetailsPanelStore } from './store';

// Toast Store
const { toasts, addToast, removeToast } = useToastStore();

// Details Panel Store
const { isOpen, selectedProjectId, open, close, toggle } = useDetailsPanelStore();
```

## 🔌 API Layer

### Making API Calls
```tsx
import { projectsApi } from './services/api';

// Get all projects
const response = await projectsApi.getAll();
const projects = response.data;

// Get by ID
const project = await projectsApi.getById('123');

// Search
const results = await projectsApi.search('query');

// Filter
const filtered = await projectsApi.filter('active', 'high', ['React']);

// Dashboard stats
const stats = await projectsApi.getDashboardStats();
```

## 🎨 Tailwind Utilities

### Spacing Scale
```tsx
// Padding/Margin: p-1, p-2, p-3, p-4, p-6, p-8
<div className="p-4 m-6">  // 16px padding, 24px margin
```

### Common Patterns
```tsx
// Card container
<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">

// Flex center
<div className="flex items-center justify-center">

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Text styles
<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
<p className="text-gray-600 dark:text-gray-400">

// Transitions
<button className="transition-all duration-200 hover:scale-105">
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Mobile first
<div className="w-full md:w-1/2 lg:w-1/3">
  
// Hidden on mobile
<div className="hidden md:block">

// Show only on mobile
<div className="md:hidden">
```

## ♿ Accessibility

### Focus Management
```tsx
// Always include focus styles
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">

// Skip to main content
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### ARIA Labels
```tsx
<button aria-label="Close modal">
  <XIcon />
</button>

<input
  aria-invalid={!!error}
  aria-describedby={error ? 'error-message' : undefined}
/>

<nav role="navigation" aria-label="Main navigation">
```

### Keyboard Navigation
```tsx
// Handle Enter and Space
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
}}

// Escape to close
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, []);
```

## 🎭 Animations

### Framer Motion
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Interactive cards
<motion.div
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
```

## 🔍 Common Patterns

### Loading State
```tsx
const [isLoading, setIsLoading] = useState(true);

{isLoading ? (
  <Skeleton />
) : (
  <ActualContent />
)}
```

### Empty State
```tsx
{items.length === 0 ? (
  <Card>
    <CardContent className="p-12 text-center">
      <div className="text-6xl mb-4">📂</div>
      <h3>No items found</h3>
      <p>Get started by creating your first item</p>
    </CardContent>
  </Card>
) : (
  <ItemList items={items} />
)}
```

### Error Handling
```tsx
try {
  await api.call();
  addToast({ type: 'success', message: 'Success!' });
} catch (error) {
  addToast({ type: 'error', message: 'Something went wrong' });
}
```

## 🎨 Color Palette

### Status Colors
```tsx
// Success - Green
bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200

// Warning - Yellow
bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200

// Error - Red
bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200

// Info - Blue
bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200
```

## 📝 TypeScript Tips

### Component Props
```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  // Component logic
};
```

### Generic Types
```tsx
interface ApiResponse<T> {
  data: T;
  message?: string;
}

const response: ApiResponse<Project[]> = await api.getProjects();
```

## 🚀 Performance Tips

1. **Memoize expensive computations**
```tsx
const filtered = useMemo(() => 
  items.filter(item => item.active), 
  [items]
);
```

2. **Debounce search inputs**
```tsx
const debouncedSearch = useMemo(
  () => debounce((value: string) => setSearch(value), 300),
  []
);
```

3. **Lazy load routes**
```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

4. **Optimize images**
```tsx
<img
  src={project.image}
  alt={project.title}
  loading="lazy"
  className="object-cover"
/>
```