import React from 'react';
import { ComponentMediator } from 'src/mediator/mediator';

interface IMediator {
  mediator: any;
}

const MediatorContext = React.createContext<IMediator>({
  mediator: new ComponentMediator(),
});

type WithMediatorProps = {
  mediator: any;
};

export const withMediator = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithMediatorProps> => ({
  mediator,
  ...props
}: WithMediatorProps) => {
  return (
    <WrappedComponent mediator={new ComponentMediator()} {...props as P} />
  );
};
