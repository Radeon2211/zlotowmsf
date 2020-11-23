import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import HeadingImage from '../../components/UI/HeadingImage';
import Heading from '../../components/UI/Heading/Heading';
import PriestList from './PriestList/PriestList';
import { headingImages } from '../../shared/constants';

const SC = {};
SC.Wrapper = styled.div``;

const Priests = () => {
  const { priests } = useSelector((state) => state.data);
  const { isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchPriests = useCallback(() => dispatch(actions.fetchPriests()), [dispatch]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (!priests) {
      onFetchPriests();
    }
    return () => onClearError();
  }, [onFetchPriests, priests, onClearError]);

  let content = null;
  if (priests) {
    if (priests.length <= 0) {
      content = (
        <Heading variant="h3" align="center" data-test="not-found">
          Nie znaleziono żadnych duszpasterzy
        </Heading>
      );
    } else {
      content = <PriestList priests={priests} />;
    }
  }

  if (isError) {
    content = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem duszpasterzy
      </Heading>
    );
  }

  return (
    <FreeSides>
      <SC.Wrapper>
        <HeadingImage slug={headingImages.PRIESTS} />
        {content}
      </SC.Wrapper>
    </FreeSides>
  );
};

export default Priests;
