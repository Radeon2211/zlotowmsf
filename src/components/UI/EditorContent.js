import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sanitizeHtml } from '../../shared/utility';

const SC = {};
SC.Wrapper = styled.section`
  font-size: ${({ theme }) => theme.fontSizes.level4};
  line-height: 1.32;
`;

const EditorContent = (props) => {
  const { content } = props;

  return content && <SC.Wrapper dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
};

EditorContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default EditorContent;
