import React, { Component } from 'react'
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    FlatList,
    ImageBackground,
    StyleSheet,
    Image,
    Share
} from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from "react-navigation";
import { fetchProducts } from '../actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../components/Item'


class Products extends React.Component {

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


    state = {
        onEndReachedCalledDuringMomentum: true,
        products: [],
        offset: 0,
        loading: false,
        limit: 10,
        category_id: this.props.navigation.getParam('categoryId', 'NO-Slug'),
        refreshin: false,
    }
    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", () => {
            this.loadProducts();

        });

    }

    loadProducts = () => {
        console.log("asdasdas")

        this.setState({ onEndReachedCalledDuringMomentum: true }, () => {

            setTimeout(() => {
                this.setState({ loading: true });
                const { offset, limit, category_id } = this.state;
                fetch(`http://auz.uz/api/articleByCategory?offset=${offset}&lang=${this.props.lang}&limit=${limit}&category_id=${category_id}`).then(res => res.json()).then(json => {

                    // this.setState((prevState) => { return { products: [...prevState.products, ...json], loading: false }})
                    if (this.state.offset == 0) {
                        this.setState({ products: json, loading: false })
                    }
                    else
                        this.setState({ products: [...this.state.products, ...json], loading: false })

                })
            }, 1500);
        });
    }


    handleEnd = () => {

        this.setState({ offset: this.state.offset + 10 }, () => this.loadProducts())
        console.log(this.state.offset)

    }
    _onMomentumScrollBegin = () => this.setState({ onEndReachedCalledDuringMomentum: false });
    renderFooter = () => {
        return (this.state.loading) ? <ActivityIndicator style={{ marginTop: 20 }} color="#A8A8A8" size="small" /> : null;
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    componentWillReceiveProps() {

    }
    render() {
        return (
            <FlatList

                data={this.state.products}
                renderItem={({ item }) => (
                    <Item navigation={this.props.navigation} item={item} onShare={this.onShare} />
                )

                }
                onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
                keyExtractor={(item, index) => 'key' + index}

                onEndReached={(info) => {
                    if (this.state.loading === false) {
                        this.handleEnd();
                        console.log(JSON.stringify(info));
                    }
                }}
                ListFooterComponent={this.renderFooter}

                onEndReachedThreshold={0}
            />
            // <View>
            //     {/* {

            //         (this.state.loading == true && this.state.offset == 0) ?
            //         <ActivityIndicator style={{ marginTop: 250 }} color="#A8A8A8" size="small" />

            //             :

            //     } */}

            // </View>
        )
    }


}

let mapStateToProps = (state) => {
    return {
        lang: state.lang.lang,
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 200,

    },
    dateIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    viewsIcon: {
        width: 23,
        height: 20,
        resizeMode: "stretch",
        marginRight: 5,
    },
    itemContainer: {
        marginTop: 10,
        paddingLeft: 10,

    },
    innerItems: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    dateViews: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: 5,
        borderRadius: 12
    },
    date: {
        flexDirection: "row",
    },
    views: {
        flexDirection: "row",
        marginLeft: 20
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
        width: 200,
        alignSelf: 'center',
        fontSize: 14,
        lineHeight: 13,
        color: '#2C436D',
    }
})

export default withNavigation(connect(mapStateToProps, { fetchProducts })(Products))