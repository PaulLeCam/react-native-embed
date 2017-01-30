// Export the full public API of react-native-web
export {
  // top-level API
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // web-only
  renderToStaticMarkup,
  renderToString,
  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  Image,
  ListView,
  ProgressBar,
  ScrollView,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableBounce,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  // modules
  NativeModules,
} from 'react-native-web'

// bridge
export {
  postEvent,
  postMessage,
  postRequest,
  postResponse,
  setup,
} from './bridge'

// APIs
import * as AlertAPI from './apis/Alert'
export const Alert = AlertAPI
