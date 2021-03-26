import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as SC from './Footer.sc';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { basic } = useSelector((state) => state.data);

  const authorLink = basic?.extraInfo?.authorLink;

  return (
    <SC.Wrapper>
      <PrivacyPolicy isOpen={isModalOpen} closed={() => setIsModalOpen(false)} />
      <span className="copyright">
        &copy;2021 Parafia Rzymskokatolicka w Złotowie pw. Wniebowzięcia Najświętszej Maryi Panny
      </span>
      <span
        className="darken-text"
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={() => setIsModalOpen(true)}
      >
        Polityka prywatności
      </span>
      <span className="author">
        Stworzone przez
        <a href={authorLink} rel="noopener noreferrer" target="_blank" className="darken-text">
          &nbsp;Radosław Mikrut
        </a>
      </span>
    </SC.Wrapper>
  );
};

export default Footer;
