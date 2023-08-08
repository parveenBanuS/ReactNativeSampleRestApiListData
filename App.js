import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  BackHandler,
} from "react-native";
import { Provider } from "react-redux";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { store, persistor } from "./src/store/storeconfig";
import { PersistGate } from "redux-persist/integration/react";
import LoginScreenDash from "./src/view/LoginScreenDash";
import SplashScreen from "./src/view/SplashScreen";
import Test1 from "./src/view/Test1";
import OptionScreen from "./src/view/OptionScreen";
import StaffCreate from "./src/view/StaffCreate";
import DepartmentCreate from "./src/view/DepartmentCreate";
import StudentsCreate from "./src/view/StudentsCreate";
import StaffDetils from "./src/view/StaffDetils";
import FilterStaff from "./src/view/FilterStaff";
import CourseDetails from "./src/view/CourseDetails";
import StudentDetails from "./src/view/StudentDetails";
import StaffView from "./src/view/StaffView";
import StudentView from "./src/view/StudentView";
import DepartmentView from "./src/view/DepartmentView";

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  duration: 1000,
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // WeighmentCorrectionCreate
        // initialRouteName={'Splash'}
        initialRouteName={"SplashScreen"}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="LoginScreenDash"
          component={LoginScreenDash}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Test1"
          component={Test1}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="OptionScreen"
          component={OptionScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StaffCreate"
          component={StaffCreate}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DepartmentCreate"
          component={DepartmentCreate}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StudentsCreate"
          component={StudentsCreate}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StaffDetils"
          component={StaffDetils}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="FilterStaff"
          component={FilterStaff}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StudentDetails"
          component={StudentDetails}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StaffView"
          component={StaffView}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StudentView"
          component={StudentView}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DepartmentView"
          component={DepartmentView}
          options={{
            gestureEnabled: false,
          }}
        />
        {/* NonCaneAnalysisEditView */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {
    // enableLatestRenderer();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
