import { cn } from '@/lib/utils';
import { Children, cloneElement, type ReactElement } from 'react';
import type { ButtonProps } from './button';

interface iAppProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export function ButtonGroup({ className, children }: iAppProps) {
  const totalButtons = Children.count(children);
  return (
    <div className={cn('flex w-full', className)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;

        return cloneElement(child, {
          key: index,
          className: cn(
            {
              'rounded-l-none': !isFirstItem,
              'rounded-r-none': !isLastItem,
              'border-l-0': !isFirstItem,
            },
            child.props.className,
          ),
        });
      })}
    </div>
  );
}
0;
