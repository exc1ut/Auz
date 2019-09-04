import React from 'react'
import {Text,TouchableOpacity,StyleSheet,Image,View} from 'react-native'
import {connect} from 'react-redux'
import {changeLang,fetchCategories} from '../actions'

class AboutScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft:(<TouchableOpacity onPress={()=>navigation.openDrawer()}><Image style={{ width: 20, height: 20, marginLeft: 15}} source={require('../assets/menu.png')}/></TouchableOpacity>),
            
        };
      };

    render()
    {
        return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>{this.props.lang == "uz"?"Тез кунда":"Скоро"}</Text>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang,
    }
  }

  const styles = StyleSheet.create({
      container: {
          flex:1,
          justifyContent:"center",
          alignItems:"center"
      }
  })

export default connect(mapStateToProps,{changeLang,fetchCategories})(AboutScreen)