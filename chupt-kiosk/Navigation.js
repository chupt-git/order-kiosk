import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Menu from './Menu';
import Pickup from './Pickup';
import Finish from './Finish';
import Checkout from './Checkout';

const Navigation = createStackNavigator(
  {
  Home: Home,
  Menu: Menu,
  Pickup: Pickup,
  Finish: Finish,
  Checkout: Checkout,
},
  {
    initialRouteName: "Home",
    navigationOptions: {
          gesturesEnabled: false,
      },
    headerMode: 'none',
  }
);


// const AppContainer = createAppContainer(Navigation);
//
// export default AppContainer;
export default createAppContainer(Navigation);
