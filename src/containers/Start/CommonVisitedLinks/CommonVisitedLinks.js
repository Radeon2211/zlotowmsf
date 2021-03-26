import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './CommonVisitedLinks.sc';
import MainButton from '../../../components/UI/Buttons/MainButton';
import { ReactComponent as AnnoucementsIcon } from '../../../images/SVG/annoucements.svg';
import { ReactComponent as IntentionsIcon } from '../../../images/SVG/intentions.svg';
import { ReactComponent as FacebookIcon } from '../../../images/SVG/facebook.svg';
import { ReactComponent as ObituariesIcon } from '../../../images/SVG/obituaries.svg';
import { validateURL } from '../../../shared/utility';

const CommonVisitedLinks = () => {
  const { basic } = useSelector((state) => state.data);

  const facebookLink = basic?.extraInfo?.parishFacebookLink;
  const obituariesLink = basic?.extraInfo?.obituariesLink;

  return (
    <SC.Wrapper>
      <div className="bg-image" />
      <div className="buttons-wrapper">
        <Link to="/ogloszenia" className="link">
          <MainButton>
            <AnnoucementsIcon />
            Ogłoszenia
          </MainButton>
        </Link>
        <Link to="/intencje" className="link">
          <MainButton>
            <IntentionsIcon />
            Intencje
          </MainButton>
        </Link>
        <a
          href={validateURL(obituariesLink) ? obituariesLink : ''}
          rel="noopener noreferrer"
          className="link"
        >
          <MainButton>
            <ObituariesIcon />
            Nekrologi
          </MainButton>
        </a>
        <a
          href={validateURL(facebookLink) ? facebookLink : ''}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <MainButton>
            <FacebookIcon />
            Facebook
          </MainButton>
        </a>
      </div>
    </SC.Wrapper>
  );
};

export default CommonVisitedLinks;
