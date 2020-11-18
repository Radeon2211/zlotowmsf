# MSF Złotów

### Website of Parish of the Assumption of the Blessed Virgin Mary in Złotów

This site is built with React and Wordpress REST API. To style it I used styled-components. And to do animations - framer-motion. Data from API are stored in Redux store. The app is largely tested.

To link React with Wordpress I used [create-react-wptheme](https://github.com/michaelsoriano/create-react-wptheme).

### Source folder structure

- **axios** - properly configured Axios instance used across the app. To make this work it needs machine IP from shared/constants

- **components** - components that are used across the entire app

  - **CommunityAndGalleryDetails** is used in containers/ParishCommunityDetails and containers/GalleryDetails
  - **CommunityAndGalleryList** is used in containers/GalleryYear and containers/ParishCommunities
  - **ImageGallery** is used in containers/NewsDetails and components/CommunityAndGalleryDetails
  - **Pagination** is used in containers/GalleryYear and containers/News
  - **MajorSiteTemplate** is used in containers/PlainSites

- **containers** - all the sites in the app, sites which content is fully fetched from API are grouped in PlainSites folder
- **images** - images and SVG icons
- **shared** - utility functions and variables, framer-motion animations
- **store** - Redux actions and reducers
- **styled** - global styles and style options ready to use everywhere in the app
