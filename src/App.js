import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/dataActions';
import Main from './components/UI/Main';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import StartLoader from './components/UI/Loaders/StartLoader';

import Start from './containers/Start/Start';

const App = () => {
  const windowWidth = useWindowWidth();
  const basicData = useSelector((state) => state.data.basic);

  const dispatch = useDispatch();
  const onFetchBasicData = useCallback(() => dispatch(actions.fetchBasicData()), [dispatch]);

  useEffect(() => {
    onFetchBasicData();
  }, [onFetchBasicData]);

  let appContent = <StartLoader />;
  if (basicData) {
    const navigation = windowWidth > 900 ? <DesktopNavigation /> : <MobileNavigation />;
    appContent = (
      <>
        {navigation}
        <Main>
          <Switch>
            <Route path="/" component={Start} />
          </Switch>
        </Main>
      </>
    );
  }

  return appContent;
};

export default App;
