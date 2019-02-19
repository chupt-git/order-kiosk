import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import MenuPicker from './screens/MenuPicker';
import Pickup from './screens/Pickup';
import Finish from './screens/Finish';
import Checkout from './screens/Checkout';
import Menu from './screens/Menu';
import Cart from './screens/Cart'

const Navigation = createStackNavigator(
  {
  Home: Home,
  MenuPicker: MenuPicker,
  Menu: Menu,
  Pickup: Pickup,
  Finish: Finish,
  Checkout: Checkout,
  Cart: Cart
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
