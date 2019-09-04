import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { changeLang, fetchCategories } from '../actions';
import HTML from 'react-native-render-html';

class ContactScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require('../assets/menu.png')} />
				</TouchableOpacity>
			)
		};
	};

	render() {
		const Html =
			'<div class="col-md-12 news-top-left">  <p>Андижон шаҳри А. Навоий шоҳкўчаси 71-уй </p>  <p>Телефон: +998937820257</p>  <p>E-mail: <a href="mailto:fotopress@bk.ru">fotopress@bk.ru</a> . infoauz@bk.ru</p>  <p>Рустамжон Эшонов  веб-сайт бўйича масъул   </p> </div>';
		const tagsStyles = {
			p: { fontSize: 17, color: '#2C436D', lineHeight: 25 },
			h2: { color: '#2C436D', marginVertical: 10 }
		};
		return (
			<View style={styles.container}>
				<HTML tagsStyles={tagsStyles} html={Html} imagesMaxWidth={Dimensions.get('window').width} />
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.lang.lang
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default connect(mapStateToProps, { changeLang, fetchCategories })(ContactScreen);
