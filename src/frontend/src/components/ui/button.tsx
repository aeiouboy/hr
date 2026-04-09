import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
 {
 variants: {
 variant: {
 default:'bg-brand text-white hover:bg-brand/90 focus-visible:ring-brand',
 secondary:'bg-surface-raised text-ink hover:bg-surface-raised focus-visible:ring-gray-400 hover:bg-surface-raised border-hairline',
 outline:'border border-hairline bg-surface hover:bg-surface-raised focus-visible:ring-gray-400 border-hairline dark:bg-transparent hover:bg-surface-raised',
 ghost:'hover:bg-surface-raised focus-visible:ring-gray-400 hover:bg-surface-raised',
 destructive:'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger',
 },
 size: {
 sm:'h-8 px-3 text-sm',
 md:'h-10 px-4 text-sm',
 lg:'h-12 px-6 text-base',
 },
 },
 defaultVariants: {
 variant:'default',
 size:'md',
 },
 }
);

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement>,
 VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, size, ...props }, ref) => {
 return (
 <button
 className={cn(buttonVariants({ variant, size, className }))}
 ref={ref}
 {...props}
 />
 );
 }
);
Button.displayName ='Button';

export { Button, buttonVariants };
