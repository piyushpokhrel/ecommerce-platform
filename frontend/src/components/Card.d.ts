import type { HTMLAttributes, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  interactive?: boolean;
}

export const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export function CardHeader(props: CardSectionProps): JSX.Element;
export function CardTitle(props: CardTitleProps): JSX.Element;
export function CardContent(props: CardSectionProps): JSX.Element;
