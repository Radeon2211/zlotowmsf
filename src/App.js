import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/dataActions';
import Start from './containers/Start/Start';
import Main from './components/UI/Main';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import Loader from './components/UI/Loader';
import Footer from './components/Footer/Footer';

const News = lazy(() => import('./containers/News/News'));
const NewsDetails = lazy(() => import('./containers/NewsDetails/NewsDetails'));
const Annoucements = lazy(() => import('./containers/PlainSites/Annoucements'));
const History = lazy(() => import('./containers/PlainSites/History'));
const Priests = lazy(() => import('./containers/Priests/Priests'));
const HolyMassesOrder = lazy(() => import('./containers/PlainSites/HolyMassesOrder'));
const MassIntentions = lazy(() => import('./containers/PlainSites/MassIntentions'));
const ParishOffice = lazy(() => import('./containers/PlainSites/ParishOffice'));
const HolyBaptism = lazy(() => import('./containers/PlainSites/Sacraments/HolyBaptism'));
const Confirmation = lazy(() => import('./containers/PlainSites/Sacraments/Confirmation'));
const Eucharist = lazy(() => import('./containers/PlainSites/Sacraments/Eucharist'));
const Atonement = lazy(() => import('./containers/PlainSites/Sacraments/Atonement'));
const AnointingOfTheSick = lazy(() =>
  import('./containers/PlainSites/Sacraments/AnointingOfTheSick'),
);
const Ordination = lazy(() => import('./containers/PlainSites/Sacraments/Ordination'));
const Marriage = lazy(() => import('./containers/PlainSites/Sacraments/Marriage'));
const MarriageCounceling = lazy(() => import('./containers/PlainSites/MarriageCounceling'));
const Gallery = lazy(() => import('./containers/Gallery/Gallery'));
const GalleryYear = lazy(() => import('./containers/GalleryYear/GalleryYear'));
const GalleryDetails = lazy(() => import('./containers/GalleryDetails/GalleryDetails'));
const Links = lazy(() => import('./containers/PlainSites/Links'));
const Contact = lazy(() => import('./containers/PlainSites/Contact'));

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

const App = () => {
  const basicData = useSelector((state) => state.data.basic);

  const dispatch = useDispatch();
  const onFetchBasicData = useCallback(() => dispatch(actions.fetchBasicData()), [dispatch]);

  useEffect(() => {
    onFetchBasicData();
  }, [onFetchBasicData]);

  let appContent = <Loader />;
  if (basicData) {
    appContent = (
      <>
        <MobileNavigation />
        <DesktopNavigation />
        <Main>
          <Switch>
            <Route exact path="/aktualnosci/:slug" component={WaitingComponent(NewsDetails)} />
            <Route exact path="/aktualnosci" component={WaitingComponent(News)} />
            <Route exact path="/parafia/historia" component={WaitingComponent(History)} />
            <Route exact path="/parafia/duszpasterze" component={WaitingComponent(Priests)} />
            <Route
              exact
              path="/parafia/porzadek-mszy-swietych"
              component={WaitingComponent(HolyMassesOrder)}
            />
            <Route exact path="/ogloszenia" component={WaitingComponent(Annoucements)} />
            <Route exact path="/intencje" component={WaitingComponent(MassIntentions)} />
            <Route
              exact
              path="/sakramenty/chrzest-swiety"
              component={WaitingComponent(HolyBaptism)}
            />
            <Route
              exact
              path="/sakramenty/bierzmowanie"
              component={WaitingComponent(Confirmation)}
            />
            <Route exact path="/sakramenty/eucharystia" component={WaitingComponent(Eucharist)} />
            <Route exact path="/sakramenty/pokuta" component={WaitingComponent(Atonement)} />
            <Route
              exact
              path="/sakramenty/namaszczenie-chorych"
              component={WaitingComponent(AnointingOfTheSick)}
            />
            <Route exact path="/sakramenty/swiecenia" component={WaitingComponent(Ordination)} />
            <Route exact path="/sakramenty/malzenstwo" component={WaitingComponent(Marriage)} />
            <Route exact path="/kancelaria" component={WaitingComponent(ParishOffice)} />
            <Route
              exact
              path="/poradnia-malzenska"
              component={WaitingComponent(MarriageCounceling)}
            />
            <Route exact path="/galeria" component={WaitingComponent(Gallery)} />
            <Route exact path="/galeria/:year" component={WaitingComponent(GalleryYear)} />
            <Route exact path="/galeria/id/:slug" component={WaitingComponent(GalleryDetails)} />
            <Route exact path="/linki" component={WaitingComponent(Links)} />
            <Route exact path="/kontakt" component={WaitingComponent(Contact)} />
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
