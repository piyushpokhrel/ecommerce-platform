import type { InputHTMLAttributes, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;
