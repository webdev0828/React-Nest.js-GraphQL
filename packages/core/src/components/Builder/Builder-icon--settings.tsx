import React from 'react';
import { SettingsWrapper } from 'src/components/Builder/Builder--style';
import ContainerPopoverSettings from 'src/components/Container/Container-popover--settings';
import { IElement } from 'src/components/Element/Element';
import ElementPopoverSettings from 'src/components/Element/Element-popover--settings';
import GridPopoverSettings from 'src/components/Grid/Grid-popover--settings';

const PopoverSettingsFactory = ({ element }: { element: IElement }) => {
  const getFactory = ({ element }) => {
    const { __typename } = element;

    switch (__typename) {
      case 'Container':
        return <ContainerPopoverSettings container={element} />;
      case 'Grid':
        return <GridPopoverSettings grid={element} />;
      case 'Element':
        return <ElementPopoverSettings element={element} />;
      default:
        return null;
    }
  };

  return getFactory({ element });
};

const BuilderIconSettings = ({ element }) => {
  const isElement = element.__typename === 'Element';

  return (
    <SettingsWrapper className={isElement ? 'Element-settings--wrapper' : ''}>
      <PopoverSettingsFactory element={element} />
      {element.__typename}
    </SettingsWrapper>
  );
};

export default BuilderIconSettings;
