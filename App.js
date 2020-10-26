import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Orientation from 'react-native-orientation';

import ConnectScreen from './src/screens/ConnectScreen';
import MainScreen from './src/screens/MainScreen';
import InfoScreen from './src/screens/InfoScreen';


const navigator = createStackNavigator(
    {
      Connect: ConnectScreen,
      Main: MainScreen,
      Info: InfoScreen,
    },{
      initialRouteName: 'Connect',
      defaultNavigationOptions: {
        headerShown: false,
      }
    }
);


export default createAppContainer(navigator);
