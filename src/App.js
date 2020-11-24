import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/indexActions';
import Start from './containers/Start/Start';
import Main from './components/UI/Main';
import ScrollToTop from './components/UI/ScrollToTop';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import Loader from './components/UI/Loader';
import Footer from './components/Footer/Footer';

import News from './containers/News/News';
import NewsDetails from './containers/NewsDetails/NewsDetails';
import History from './containers/PlainSites/History';
import Priests from './containers/Priests/Priests';
import HolyMassesOrder from './containers/PlainSites/HolyMassesOrder';
import AccessChapels from './containers/PlainSites/AccessChapels';
import ParishCommunities from './containers/ParishCommunities/ParishCommunities';
import ParishCommunityDetails from './containers/ParishCommunityDetails';
import Hospice from './containers/PlainSites/Hospice';
import CityHospital from './containers/PlainSites/CityHospital';
import Annoucements from './containers/PlainSites/Annoucements';
import MassIntentions from './containers/PlainSites/MassIntentions';
import ParishOffice from './containers/PlainSites/ParishOffice';
import HolyBaptism from './containers/PlainSites/Sacraments/HolyBaptism';
import Confirmation from './containers/PlainSites/Sacraments/Confirmation';
import Eucharist from './containers/PlainSites/Sacraments/Eucharist';
import Atonement from './containers/PlainSites/Sacraments/Atonement';
import AnointingOfTheSick from './containers/PlainSites/Sacraments/AnointingOfTheSick';
import Ordination from './containers/PlainSites/Sacraments/Ordination';
import Marriage from './containers/PlainSites/Sacraments/Marriage';
import MarriageCounceling from './containers/PlainSites/MarriageCounceling';
import Gallery from './containers/Gallery/Gallery';
import GalleryYear from './containers/GalleryYear/GalleryYear';
import GalleryDetails from './containers/GalleryDetails';
import Links from './containers/PlainSites/Links';
import Contact from './containers/PlainSites/Contact';

const App = () => {
  const basicData = useSelector((state) => state.data.basic);

  const dispatch = useDispatch();
  const onFetchBasicData = useCallback(() => dispatch(actions.fetchBasicData()), [dispatch]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    onFetchBasicData();
    return () => onClearError();
  }, [onFetchBasicData, onClearError]);

  let appContent = <Loader />;
  if (basicData) {
    appContent = (
      <>
        <ScrollToTop />
        <MobileNavigation />
        <DesktopNavigation />
        <Main>
          <Switch>
            <Route exact path="/aktualnosci/:slug" component={NewsDetails} />
            <Route exact path="/aktualnosci" component={News} />
            <Route exact path="/parafia/historia" component={History} />
            <Route exact path="/parafia/duszpasterze" component={Priests} />
            <Route exact path="/parafia/porzadek-mszy-swietych" component={HolyMassesOrder} />
            <Route exact path="/parafia/kaplice-dojazdowe" component={AccessChapels} />
            <Route exact path="/parafia/wspolnoty-parafialne" component={ParishCommunities} />
            <Route
              exact
              path="/parafia/wspolnoty-parafialne/:slug"
              component={ParishCommunityDetails}
            />
            <Route exact path="/parafia/hospicjum" component={Hospice} />
            <Route exact path="/parafia/szpital-miejski" component={CityHospital} />
            <Route exact path="/ogloszenia" component={Annoucements} />
            <Route exact path="/intencje" component={MassIntentions} />
            <Route exact path="/sakramenty/chrzest-swiety" component={HolyBaptism} />
            <Route exact path="/sakramenty/bierzmowanie" component={Confirmation} />
            <Route exact path="/sakramenty/eucharystia" component={Eucharist} />
            <Route exact path="/sakramenty/pokuta" component={Atonement} />
            <Route exact path="/sakramenty/namaszczenie-chorych" component={AnointingOfTheSick} />
            <Route exact path="/sakramenty/swiecenia" component={Ordination} />
            <Route exact path="/sakramenty/malzenstwo" component={Marriage} />
            <Route exact path="/kancelaria" component={ParishOffice} />
            <Route exact path="/poradnia-malzenska" component={MarriageCounceling} />
            <Route exact path="/galeria" component={Gallery} />
            <Route exact path="/galeria/:year" component={GalleryYear} />
            <Route exact path="/galeria/id/:slug" component={GalleryDetails} />
            <Route exact path="/linki" component={Links} />
            <Route exact path="/kontakt" component={Contact} />
            <Route exact path="/" component={Start} />
            <Redirect to="/" />
          </Switch>
        </Main>
        <Footer />
      </>
    );
  }

  return appContent;
};

export default App;
