import React from 'react';
import { ComponentType } from 'src/graphql/__generated__/graphql-api';
import ButtonModalEdit from 'src/components/Element/Form/Button-modal--edit';
import FormModalEdit from 'src/components/Element/Form/Form-modal--edit';
import HeadingModalEdit from 'src/components/Element/Form/Heading-modal--edit';
import IconModalEdit from 'src/components/Element/Form/Icon-modal--edit';
import ImageModalEdit from 'src/components/Element/Form/Image-modal--edit';
import LinkModalEdit from 'src/components/Element/Form/Link-modal--edit';
import ParagraphModalEdit from 'src/components/Element/Form/Paragraph-modal--edit';
import TextModalEdit from 'src/components/Element/Form/Text-modal--edit';

const ModalEditFactory = ({ element }) => {
  const getFactory = ({ element }) => {
    if (!element) return null;
    const component = element.component;
    const type = component.type;

    switch (type) {
      case ComponentType.Button:
        return <ButtonModalEdit element={element} />;
      case ComponentType.Form:
        return <FormModalEdit element={element} />;
      case ComponentType.Heading:
        return <HeadingModalEdit element={element} />;
      case ComponentType.Icon:
        return <IconModalEdit element={element} />;
      case ComponentType.Image:
        return <ImageModalEdit element={element} />;
      case ComponentType.Link:
        return <LinkModalEdit element={element} />;
      case ComponentType.Paragraph:
        return <ParagraphModalEdit element={element} />;
      case ComponentType.Text:
        return <TextModalEdit element={element} />;
      default:
        return null;
    }
  };

  return getFactory({ element });
};

const BuilderElementEdit = ({ element }) => {
  return <ModalEditFactory element={element} />;
};

export default BuilderElementEdit;
