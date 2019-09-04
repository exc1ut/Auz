import React, { Component } from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	FlatList,
	ImageBackground,
	StyleSheet,
	Image,
	Share,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchProducts } from '../actions';

export default (props) => {
	const { item, navigation } = props;
	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity
				onPress={() => {
					navigation.push('DetailScreen', {
						productId: item.id
					});
				}}
			>
				<ImageBackground
					source={{ uri: item.image }}
					imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, borderRadius: 10 }}
					style={{ ...styles.imageBackground, borderTopRightRadius: 25 }}
				>
					<View style={styles.innerItems}>
						<View>
							<TouchableOpacity style={{ zIndex: 101 }} onPress={() => props.onShare(item.link)}>
								<Image
									style={{ width: 30, height: 30, marginTop: 13, marginRight: 10 }}
									source={require('../assets/share.png')}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.dateViews}>
							<View style={styles.date}>
								<Image style={styles.dateIcon} source={require('../assets/date.png')} />
								<Text>{item.date}</Text>
							</View>
							<View style={styles.views}>
								<Image style={styles.viewsIcon} source={require('../assets/eye.png')} />
								<Text>{item.views}</Text>
							</View>
						</View>
					</View>
				</ImageBackground>
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.push('DetailScreen', {
								productId: item.id
							});
						}}
					>
						<Text style={styles.title}>{item.title}</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		width: '100%',
		height: 200
	},
	dateIcon: {
		width: 20,
		height: 20,
		marginRight: 5
	},
	viewsIcon: {
		width: 23,
		height: 20,
		resizeMode: 'stretch',
		marginRight: 5
	},
	itemContainer: {
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10
	},
	innerItems: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	},
	dateViews: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255,255,255,0.75)',
		padding: 5,
		borderRadius: 12
	},
	date: {
		flexDirection: 'row'
	},
	views: {
		flexDirection: 'row',
		marginLeft: 20
	},
	title: {
		marginTop: 20,
		marginBottom: 10,
		width: 300,
		alignSelf: 'center',
		fontSize: 14,
		lineHeight: 20,
		color: '#2C436D'
	}
});
