import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import { ReactComponent as AnnoucementsIcon } from '../../../images/SVG/annoucements.svg';
import { ReactComponent as IntentionsIcon } from '../../../images/SVG/intentions.svg';
import { ReactComponent as FacebookIcon } from '../../../images/SVG/facebook.svg';
import churchIndoor from '../../../images/church-indoor.jpg';

const SC = {};
SC.Wrapper = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light2};
  display: flex;
  height: 20vh;
  padding: ${({ theme }) => theme.spacings.level2};
  position: relative;

  & .bg-image {
    background-image: linear-gradient(to right, rgba(0, 0, 0, .55), rgba(0, 0, 0, .55)), url(${churchIndoor});
    background-position: center;
    background-size: cover;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  & .buttons-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level1};
  }

  & .link {
    margin: ${({ theme }) => theme.spacings.level2};

    & > button {
      align-items: center;
      display: flex;

      & > svg {
        height: 1.9rem;
        fill: ${({ theme }) => theme.colors.light1};
        margin-right: ${({ theme }) => theme.spacings.level1};
        width: 1.9rem;
      }

      &:hover {
        & > svg {
          fill: ${({ theme }) => theme.colors.blueLight};
        }
      }
    }
  }
`;

const CommonVisitedLinks = () => {
  return (
    <SC.Wrapper>
      <div className="bg-image" />
      <div className="buttons-wrapper">
        <Link to="/ogloszenia" className="link">
          <Button>
            <AnnoucementsIcon />
            Ogłoszenia
          </Button>
        </Link>
        <Link to="/intencje" className="link">
          <Button>
            <IntentionsIcon />
            Intencje
          </Button>
        </Link>
        <a
          href="https://www.facebook.com/Parafia-Wniebowzi%C4%99cia-NMP-w-Z%C5%82otowie-101235951660702"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <Button>
            <FacebookIcon />
            Facebook
          </Button>
        </a>
      </div>
    </SC.Wrapper>
  );
};

export default CommonVisitedLinks;
