import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Menu from './screens/Menu';
import Pickup from './screens/Pickup';
import Finish from './screens/Finish';
import Checkout from './screens/Checkout';

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


export default createAppContainer(Navigation);
