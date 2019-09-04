import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	FlatList,
	ImageBackground,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Share
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchProducts } from '../actions';
import HTML from 'react-native-render-html';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.onEndReachedCalledDuringMomentum = true;
	}

	onShare = async () => {
		try {
			const result = await Share.share({
				url: this.state.product.link
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

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image style={{ width: 20, height: 15, marginLeft: 15 }} source={require('../assets/back.png')} />
				</TouchableOpacity>
			),
			headerRight: (
				<TouchableOpacity onPress={() => params.share()}>
					<Image style={{ width: 20, height: 20, marginRight: 15 }} source={require('../assets/share.png')} />
				</TouchableOpacity>
			)
		};
	};

	state = {
		product: {},
		loading: false,
		product_id: this.props.navigation.getParam('productId', 'NO-Slug')
	};
	componentDidMount() {
		const { navigation } = this.props;
		this.props.navigation.setParams({ share: this.onShare });
		this.focusListener = navigation.addListener('didFocus', () => {
			this.loadProduct();
		});
	}

	loadProduct = () => {
		this.setState({ loading: true });
		const { offset, limit, category_id } = this.state;
		fetch(`http://auz.uz/api/article?lang=${this.props.lang}&id=${this.state.product_id}`)
			.then((res) => res.json())
			.then((json) => {
				console.log(json.full_text);
				this.setState({ product: json, loading: false });
			});
	};

	componentWillUnmount() {
		this.focusListener.remove();
	}
	componentWillReceiveProps() {}
	render() {
		const { product } = this.state;
		const tagsStyles = {
			p: { fontSize: 17, color: '#2C436D', lineHeight: 25 },
			h2: { color: '#2C436D', marginVertical: 10 }
		};
		return (
			<View>
				{this.state.loading == true && this.state.offset == 0 ? (
					<ActivityIndicator style={{ marginTop: 250 }} color="#A8A8A8" size="small" />
				) : (
					<ScrollView>
						<View style={styles.container}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>{product.title}</Text>
							</View>
							<View style={styles.dateViews}>
								<View style={styles.date}>
									<Image style={styles.dateIcon} source={require('../assets/date.png')} />
									<Text>{product.date}</Text>
								</View>
								<View style={styles.views}>
									<Image style={styles.viewsIcon} source={require('../assets/eye.png')} />
									<Text>{product.views}</Text>
								</View>
							</View>
							<Image style={styles.mainImage} source={{ uri: product.image }} />
							<View style={styles.htmlContainer}>
								<HTML
									tagsStyles={tagsStyles}
									html={product.full_text}
									imagesMaxWidth={Dimensions.get('window').width}
								/>
							</View>
						</View>
					</ScrollView>
				)}
			</View>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		lang: state.lang.lang
	};
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: '500',
		color: '#2C436D',
		marginTop: 15,
		marginBottom: 15,
		marginHorizontal: 10
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
		paddingLeft: 10
	},
	innerItems: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	},
	dateViews: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255,255,255,0.5)',
		padding: 5,
		borderRadius: 12,
		justifyContent: 'space-between'
	},
	htmlContainer: {
		marginHorizontal: 15,
		marginVertical: 20
	},
	date: {
		flexDirection: 'row'
	},
	views: {
		flexDirection: 'row',
		marginLeft: 20
	},
	mainImage: {
		width: '100%',
		height: 170
	}
});

export default withNavigation(connect(mapStateToProps, { fetchProducts })(Detail));
