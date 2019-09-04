import React from 'react';

import {
	DrawerItems,
	createAppContainer,
	MaterialTopTabBar,
	createSwitchNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
	createStackNavigator,
	createMaterialTopTabNavigator
} from 'react-navigation';

import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Button, Text, Platform, StatusBar } from 'react-native';
import { Linking } from 'expo';

export default (CDrawerComponent = (props) => {
	const { changeRu, changeUz, fetchCategories, lang } = props;
	return (
		<ScrollView>
			<View style={styles.header}>
				<Image style={styles.drawerLogo} source={require('../assets/Logo.png')} />
			</View>
			<View style={styles.changelangContainer}>
				<View>
					<TouchableOpacity
						style={{
							margin: 5,
							justifyContent: 'center',
							alignItems: 'center',
							width: 52,
							height: 52,
							borderRadius: 5,
							backgroundColor: lang == 'uz' ? '#965858' : '#C4C4C4'
						}}
						onPress={() => {
							changeUz();
							fetchCategories('uz');
						}}
					>
						<Text style={{ color: lang == 'uz' ? '#fff' : '#2C436D', fontSize: 20, fontWeight: 'bold' }}>
							UZ
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={{
							margin: 5,
							justifyContent: 'center',
							alignItems: 'center',
							width: 52,
							height: 52,
							borderRadius: 5,
							backgroundColor: lang == 'ru' ? '#965858' : '#C4C4C4'
						}}
						onPress={() => {
							changeRu();
							fetchCategories('ru');
						}}
					>
						<Text style={{ color: lang == 'ru' ? '#fff' : '#2C436D', fontSize: 20, fontWeight: 'bold' }}>
							RU
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ borderBottomColor: '#d1d1d1', borderBottomWidth: 1 }}>
				<DrawerItems {...props} activeTintColor="#2C436D" labelStyle={{ color: '#2C436D' }} />
			</View>
			<View>
				<Text style={{ ...styles.copyright, marginTop: 20 }}>© 2019 AUZ.UZ 16+</Text>
				<TouchableOpacity onPress={() => Linking.openURL('https://oqila.uz/')}>
					<Text style={{ ...styles.copyright }}>
						Мобил илова яратиш - <Text style={{ color: '#2C436D' }}>Oqila</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
});

const styles = StyleSheet.create({
	header: {
		marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		alignItems: 'center',
		height: 70,
		borderBottomColor: '#adadad',
		borderBottomWidth: 1
	},
	drawerLogo: {
		height: 60,
		width: 130
	},
	changelangContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20
	},
	copyright: {
		textAlign: 'center',
		color: 'gray',
		padding: 5,
		fontWeight: 'bold'
	}
});
