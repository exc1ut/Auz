import React from 'react'
import Banner, { IndicaterAlign, IndicaterType } from 'react-native-whc-banner';
import Icon from '@expo/vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class MainBanner extends React.Component {
    render() {
        return (
            <Banner style={styles.banner}
                indicaterType={IndicaterType.circle}>
                <View><View style={styles.slide}>

                    <Image
                        style={styles.img}
                        source={require('../assets/second.png')}
                    />
                    <View style={styles.skipButton}>
                        <TouchableOpacity onPress={this.props.close}>
                            <Icon style={{ paddingLeft: 20, color: '#000' }} name="md-arrow-round-forward" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoCover}>
                        <Image style={styles.logo}
                            source={require('../assets/Logo.png')}
                        />
                    </View>
                    <View style={styles.desc}>
                        <Image style={styles.descImg}
                            source={require('../assets/transparent.png')}
                        />
                        <View>
                            <View >
                                <Text style={styles.text}>Andijon <Text style={styles.red}>24</Text></Text>

                            </View>
                            <View>
                                <Text style={styles.smallText}>Tezkor xabarlar</Text>
                            </View>
                        </View>
                    </View>

                </View>

                </View>
                <View><View style={styles.slide}>

                    <Image
                        style={styles.img}
                        source={require('../assets/first.png')}
                    />
                    <View style={styles.skipButton}>
                        <TouchableOpacity onPress={this.props.close}>
                            <Icon style={{ paddingLeft: 20, color: '#000' }} name="md-arrow-round-forward" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoCover}>
                        <Image style={styles.logo}
                            source={require('../assets/Logo.png')}
                        />
                    </View>
                    <View style={styles.desc}>
                        <Image style={styles.descImg}
                            source={require('../assets/transparent.png')}
                        />
                        <View>
                            <View >
                                <Text style={styles.text}>Andijon <Text style={styles.red}>24</Text></Text>

                            </View>
                            <View>
                                <Text style={styles.smallText}>Yangiliklar</Text>
                            </View>
                        </View>
                    </View>

                </View>

                </View>
                <View><View style={styles.slide}>

                    <Image
                        style={styles.img}
                        source={require('../assets/second.png')}
                    />
                    <View style={styles.skipButton}>
                        <TouchableOpacity onPress={this.props.close}>
                            <Icon style={{ paddingLeft: 20, color: '#000' }} name="md-arrow-round-forward" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoCover}>
                        <Image style={styles.logo}
                            source={require('../assets/Logo.png')}
                        />
                    </View>
                    <View style={styles.desc}>
                        <Image style={styles.descImg}
                            source={require('../assets/transparent.png')}
                        />
                        <View>
                            <View >
                                <Text style={styles.text}>Andijon <Text style={styles.red}>24</Text></Text>

                            </View>
                            <View>
                                <Text style={styles.smallText}>Reportajlar</Text>
                            </View>
                        </View>
                    </View>

                </View>

                </View>
            </Banner>
        )
    }
}


let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const styles = new StyleSheet.create({
    banner: {
        height: ScreenHeight,
        width: ScreenWidth,
    },
    img: {
        width: ScreenWidth,
        height: ScreenHeight,

    },
    slides: {
        width: ScreenHeight,
        height: ScreenWidth,
    },
    logoCover: {
        backgroundColor: "rgba(245, 243, 250, 0.6)",

        position: 'absolute',
        width: 250,
        height: 250,
        top: ScreenHeight * 0.15,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200
    },
    desc: {
        position: 'absolute',
        bottom: 0,
        height: '40%',
        width: ScreenWidth,
        justifyContent: 'center',
        alignItems: 'center',

    },
    descImg: {
        position: "absolute",
        width: '110%',
        height: '120%',
        resizeMode: 'stretch'
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 48,
        lineHeight: 72,
        fontWeight: 'bold',
        marginTop: '-30%',
    },
    red: {
        color: "#FA4141",

    },
    smallText: {
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    skipStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#000",
    },
    skipButton: {
        position: "absolute",
        alignSelf: "flex-end",
        marginTop: "10%",
        marginRight: "5%",
        textTransform: "uppercase",
        zIndex: 99,

    }
})