import React from 'react'
import { createStore } from 'redux'
import reducers from '../reducers'
import { DrawerItems, createAppContainer, MaterialTopTabBar, createSwitchNavigator, createDrawerNavigator, createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Button, Text, Platform, StatusBar } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { changeLang, fetchCategories, fetchProducts, searchText } from '../actions'
import Lang from './lang'
import HotScreen from '../screens/HotScreen'
import MostScreen from '../screens/MostScreen'
import LentaScreen from '../screens/LentaScreen'
import Prodcuts from '../screens/Products'
import Detail from '../screens/Detail'
import SearchScreen from '../screens/Search'
import AboutScreen from '../screens/About';

import ContactScreen from '../screens/Contact';

import CDrawerComponent from './CDrawer'




class Navigation extends React.Component {

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  changeRu = () => {
    console.log("ru")
    return this.props.changeLang("ru")
  }
  changeUz = () => {
    console.log("uz")
    return this.props.changeLang("uz")
  }


  componentWillMount() {
    this.props.fetchCategories(this.props.lang);
  }
  componentWillReceiveProps() {

  }
  render() {
    const cat = (this.props.lang == "uz") ? this.props.category : this.props.category;

    let loadRoute = {};
    let routes = {};
    let route = (categories) => {
      routes = {}
      if (categories.length !== 0) {

        categories.forEach((category) => {

          if (category.name != undefined) {
            routes[category.name] = {
              screen: createStackNavigator({
                list: Prodcuts
              }, {
                  headerMode: 'none',
                  initialRouteParams: {
                    categoryId: category.id,
                  }
                })
            }
          }
        })


        return routes;
      }
      else {
        return loadRoute["Loading"] = {
          Loading: createStackNavigator({
            screen: LentaScreen,
          })
        }
      }
    }

    getInitialRoute = (cat) => {

      if (cat.length !== 0) {
        console.log(cat[0].name)
        return true;
      }
      else
        return false

    }

    LentaTab = createMaterialTopTabNavigator(route(cat), {
      tabBarOptions: {
        scrollEnabled: true,
        style: {
          backgroundColor: '#F8F1F1'
        },
        tabStyle: {
          width: 120,
        },
        labelStyle: {
          fontSize: 10,
          color: '#2C436D',
          fontWeight: 'bold'
        },
        indicatorStyle: {
          backgroundColor: '#fff',
          height: 120,
        }
      },
    })
    bottomRoutes = {};
    bottomRoutes[Lang(this.props.lang).lenta] = {
      screen: createStackNavigator({
        screen: LentaTab,
        DetailScreen: Detail,
        Search: SearchScreen
      }, {

          defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (<Image style={{ width: 80, height: 40 }} source={require('../assets/Logo.png')} />),
            headerLeft: (<TouchableOpacity onPress={navigation.openDrawer}><Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require('../assets/menu.png')} /></TouchableOpacity>),
            headerRight: (<TouchableOpacity onPress={() => navigation.navigate('Search')}><Image style={{ width: 20, height: 20, marginRight: 15 }} source={require('../assets/search.png')} /></TouchableOpacity>),

          }),
          headerLayoutPreset:'center',
        }),
      navigationOptions: {
        tabBarIcon: (<Image style={{ width: 27, height: 27 }} source={require('../assets/lenta.png')} />)
      }
    }
    bottomRoutes[Lang(this.props.lang).hot] = {
      screen: createStackNavigator({
        screen: HotScreen,
        DetailScreen: Detail,
        Search: SearchScreen

      }, {

          defaultNavigationOptions: ({ navigation }) => ({
            
            headerTitle: (<Image style={{ width: 80, height: 40 }} source={require('../assets/Logo.png')} />),
            headerLeft: (<TouchableOpacity onPress={navigation.openDrawer}><Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require('../assets/menu.png')} /></TouchableOpacity>),
            headerRight: (<TouchableOpacity onPress={() => navigation.navigate('Search')}><Image style={{ width: 20, height: 20, marginRight: 15 }} source={require('../assets/search.png')} /></TouchableOpacity>)
          }),
          headerLayoutPreset:'center',
        }),
      navigationOptions: {
        tabBarIcon: (<Image style={{ width: 27, height: 27 }} source={require('../assets/hot.png')} />),
        
      }
    }
    bottomRoutes[Lang(this.props.lang).most] = {
      screen: createStackNavigator({
        screen: MostScreen,
        DetailScreen: Detail,
        Search: SearchScreen

      }, {

          defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (<Image style={{ width: 80, height: 40 }} source={require('../assets/Logo.png')} />),
            headerLeft: (<TouchableOpacity onPress={navigation.openDrawer}><Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require('../assets/menu.png')} /></TouchableOpacity>),
            headerRight: (<TouchableOpacity onPress={() => navigation.navigate('Search')}><Image style={{ width: 20, height: 20, marginRight: 15 }} source={require('../assets/search.png')} /></TouchableOpacity>)
          }),
          headerLayoutPreset:'center',
        }),
      navigationOptions: {
        tabBarIcon: (<Image style={{ width: 27, height: 27 }} source={require('../assets/most.png')} />)
      }
    }

    const TabNavigator = createBottomTabNavigator(bottomRoutes, {
      navigationOptions: {
        title: 'Home',
      },
      tabBarOptions: {
        style: {
          backgroundColor: '#F3E4E4',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 11,
          color: '#2C436D'
        },
        activeBackgroundColor: "rgba(255,255,255,0.7)"
      }
    });
    drawerRoute = {}

    drawerRoute[Lang(this.props.lang).main] = {
      screen: TabNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-home" size={20} color="#2C436D" />
        ),
        drawerLabel: Lang(this.props.lang).main,

      }
    }


    drawerRoute[Lang(this.props.lang).about] = {
      screen: createStackNavigator({
        screen: AboutScreen,

      }, {
          defaultNavigationOptions: {
            headerTitle: Lang(this.props.lang).about,
          }
        }),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-book" size={20} />
        )
      }
    }
    drawerRoute[Lang(this.props.lang).contact] = {
      screen: createStackNavigator({
        screen: ContactScreen,

      }, {
          defaultNavigationOptions: {
            headerTitle: Lang(this.props.lang).contact,
          }
        }),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-call" size={20} color="#2C436D" />
        )
      }
    }

    const DrawerNav = createDrawerNavigator(drawerRoute, {
      contentComponent: props => <CDrawerComponent
        
        changeRu={this.changeRu}
        changeUz={this.changeUz}
        fetchCategories={this.props.fetchCategories}
        lang={this.props.lang}
        {...props}
      />,
    })
    let Nav = createAppContainer(DrawerNav);
    return (
      <Nav screenProps={{ search: this.props.search, searchText: this.props.searchText }} />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.lang.lang,
    category: state.category.data,
    search: state.search.text
  }
}


const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 20 : 20,
    alignItems: "center",
    height: 70,
    borderBottomColor: '#adadad',
    borderBottomWidth: 1,
  },
  drawerLogo: {
    height: 60,
    width: 130
  },
  changelangContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginVertical: 20
  }

})

export default connect(mapStateToProps, { changeLang, fetchCategories, fetchProducts, searchText })(Navigation)
