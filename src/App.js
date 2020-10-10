import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/dataActions';
import Main from './components/UI/Main';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import Loader from './components/UI/Loader';

import Start from './containers/Start/Start';
import News from './containers/News/News';
import NewsDetails from './containers/NewsDetails/NewsDetails';
import HolyMassesOrder from './containers/HolyMassesOrder';
import History from './containers/History';
import Contact from './containers/Contact';
import MassIntentions from './containers/MassIntentions';
import MarriageCounceling from './containers/MarriageCounceling';
import ParishOffice from './containers/ParishOffice';
import Footer from './components/Footer/Footer';

const App = () => {
  const windowWidth = useWindowWidth();
  const basicData = useSelector((state) => state.data.basic);

  const dispatch = useDispatch();
  const onFetchBasicData = useCallback(() => dispatch(actions.fetchBasicData()), [dispatch]);

  useEffect(() => {
    onFetchBasicData();
  }, [onFetchBasicData]);

  let appContent = <Loader />;
  if (basicData) {
    const navigation = windowWidth > 900 ? <DesktopNavigation /> : <MobileNavigation />;
    appContent = (
      <>
        {navigation}
        <Main>
          <Switch>
            <Route path="/aktualnosci/:slug" component={NewsDetails} />
            <Route path="/aktualnosci" component={News} />
            <Route path="/parafia/historia" component={History} />
            <Route path="/parafia/porzadek-mszy-swietych" component={HolyMassesOrder} />
            <Route path="/intencje" component={MassIntentions} />
            <Route path="/kancelaria" component={ParishOffice} />
            <Route path="/poradnia-malzenska" component={MarriageCounceling} />
            <Route path="/kontakt" component={Contact} />
            <Route path="/" component={Start} />
          </Switch>
        </Main>
        <Footer />
      </>
    );
  }

  return appContent;
};

export default App;
