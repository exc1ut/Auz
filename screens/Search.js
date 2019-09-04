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
	TextInput,
	StatusBar,
	Platform,
	Share
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchProducts, searchText } from '../actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../components/Item';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.onEndReachedCalledDuringMomentum = true;
	}

	onShare = async (link) => {
		try {
			const result = await Share.share({
				url: link
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
		let change = navigation.getParam('changeSearch');
		let search = navigation.getParam('search');
		return {
			header: null
		};
	};

	state = {
		products: [],
		offset: 0,
		loading: false,
		limit: 10,
		search: ''
	};
	changeSearch = (text) => {
		this.setState({ search: text, offset: 0 });
		this.loadProducts(text);
	};

	componentDidMount() {
		const { navigation } = this.props;
		this.props.navigation.setParams({
			changeSearch: this.changeSearch
		});
		this.focusListener = navigation.addListener('didFocus', () => {});
	}

	loadProducts = (text) => {
		this.setState({ loading: true });
		const { offset, limit, category_id } = this.state;

		fetch(
			`http://auz.uz/api/search?offset=${offset}&lang=${this.props.lang}&limit=${this.state.limit}&query=${this
				.state.search}`
		)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				if (offset == 0) this.setState({ products: json, loading: false });
				else this.setState({ products: [ ...this.state.products, ...json ], loading: false });
			});
	};

	handleEnd = () => {
		this.setState({ offset: this.state.offset + 10 }, () => this.loadProducts());
	};

	renderFooter = () => {
		return this.state.loading ? <ActivityIndicator style={{ marginTop: 20 }} color="#A8A8A8" size="small" /> : null;
	};

	componentWillUnmount() {
		// Remove the event listener
		this.focusListener.remove();
	}
	componentWillReceiveProps() {}
	render() {
		return (
			<View>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Image
							style={{ width: 20, height: 15, marginLeft: 15 }}
							source={require('../assets/back.png')}
						/>
					</TouchableOpacity>

					<Image style={styles.searchIcon} source={require('../assets/search.png')} />
					<TextInput
						style={{ ...styles.input }}
						onChangeText={(text) => this.changeSearch(text)}
						value={this.state.search}
						placeholder={this.props.lang == 'uz' ? 'Излаш...' : 'Поиск...'}
					/>
				</View>
				<FlatList
					contentContainerStyle={{ paddingBottom: 70 }}
					data={this.state.products}
					renderItem={({ item }) => (
						<Item navigation={this.props.navigation} item={item} onShare={this.onShare} />
					)}
					keyExtractor={(item, index) => 'key' + index}
					onEndReached={this.handleEnd}
					ListFooterComponent={this.renderFooter}
					onEndReachedThreshold={0}
				/>
			</View>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		lang: state.lang.lang,
		search: state.search.text
	};
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
		borderRadius: 12
	},
	date: {
		flexDirection: 'row'
	},
	views: {
		flexDirection: 'row',
		marginLeft: 20
	},
	searchIcon: {
		position: 'absolute',
		width: 20,
		height: 20,
		right: '11%',
		zIndex: 99
	},
	title: {
		marginTop: 10,
		marginBottom: 10,
		width: 200,
		alignSelf: 'center',
		fontSize: 14,
		lineHeight: 13,
		color: '#2C436D'
	},
	header: {
		flexDirection: 'row',
		marginTop: Platform.OS === 'ios' ? 20 : 20,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: '#adadad',
		borderBottomWidth: 1,
		height: 50
	},
	input: {
		width: '70%',
		marginRight: '10%',
		borderRadius: 15,
		height: 31,
		backgroundColor: '#F8F1F1',
		paddingHorizontal: 15,
		color: '#7C91BE'
	},
	searchSection: {
		flex: 1,
		width: '100%',
		backgroundColor: '#000'
	}
});

export default withNavigation(connect(mapStateToProps, { fetchProducts, searchText })(Search));
