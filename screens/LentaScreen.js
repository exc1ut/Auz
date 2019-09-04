import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {changeLang,fetchCategories} from '../actions'

class LentaScreen extends React.Component {
    
    state={
        data:{},
    }

      componentDidMount()
      {
      }
      


    render()
    {
        
        return (
        <TouchableOpacity >
            <Text>{this.props.lang}</Text>
        </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang,
    }
  }

export default connect(mapStateToProps,{changeLang,fetchCategories})(LentaScreen)