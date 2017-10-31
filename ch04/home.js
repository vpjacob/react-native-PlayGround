import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Platform,
    TextInput,
    Button,
    ScrollView,
    Dimensions,
    ListView,
    Alert,
    TouchableHighlight,
    StatusBar,
    Image,
    RefreshControl,

} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components'

export default class home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ // 创建ListView.DataSource数据源
            rowHasChanged: (r1, r2) => r1 !== r2
        });


        this.state = {
            currentPage: 0,
            isRefresh: false,
            advertisments: [
                {image: require('./images/advertisement-image-01.jpg')},
                {image: require('./images/advertisement-image-02.jpg')},
                {image: require('./images/advertisement-image-03.jpg')},
            ],
            dataSource: ds.cloneWithRows([
                {image: require('./images/product-image-01.jpg'), title: '商品1', subtitle: '描述1'},
                {image: require('./images/product-image-01.jpg'), title: '商品2', subtitle: '描述2'},
                {image: require('./images/product-image-01.jpg'), title: '商品3', subtitle: '描述3'},
                {image: require('./images/product-image-01.jpg'), title: '商品4', subtitle: '描述4'},
                {image: require('./images/product-image-01.jpg'), title: '商品5', subtitle: '描述5'},
                {image: require('./images/product-image-01.jpg'), title: '商品6', subtitle: '描述6'},
                {image: require('./images/product-image-01.jpg'), title: '商品7', subtitle: '描述7'},
                {image: require('./images/product-image-01.jpg'), title: '商品8', subtitle: '描述8'},
                {image: require('./images/product-image-01.jpg'), title: '商品9', subtitle: '描述9'},
                {image: require('./images/product-image-01.jpg'), title: '商品10', subtitle: '描述10'},
            ]),
            searchText: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'blue'} barStyle={'default'} networkActivityIndicatorVisible={true}>

                </StatusBar>
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索商品' onChangeText={(text) => {
                        this.setState({searchText: text});
                    }}>
                    </TextInput>
                    <Button style={styles.button} title='search'
                            onPress={() => Alert.alert('点击了搜索' + this.state.searchText, null, null)}></Button>
                </View>
                <View style={styles.advertisingment}>
                    <ScrollView ref='scrollView' horizontal={true} pagingEnabled={true}>
                        {this.state.advertisments.map((advertisment, index) => {
                            return (
                                <TouchableHighlight key={index} onPress={() => Alert.alert('点击了轮播图', null, null)}>
                                    <Image style={styles.advertisingmentContent} source={advertisment.image}>

                                    </Image>
                                </TouchableHighlight>
                            );
                        })}
                    </ScrollView>

                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}
                              renderSeparator={this._renderSeprator} refreshControl={this._renderRefreshControl()}/>
                </View>
            </View>
        );
    }

    _renderRefreshControl() {
        return (
            <RefreshControl tintColor={'#f00'} title={'正在刷新数据中，请稍后~~'} isRefreshing={this.state.isRefresh}
                            onRefresh={this._onRefresh}>
            </RefreshControl>
        );
    }

    _onRefresh = () => {
        this.setState({isRefresh: true});

        // setTimeout(() => {
        //     this.setState({isRefresh: false})
        // }, 2000);
    };

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => {
                // const navigator = this.props.navigator;
                const navigator = this.props.navigator;
                if (navigator) {
                    navigator.push({
                        name: 'detail',
                        component: Detail,
                        param:{
                            productTitle:rowData.title
                        }
                    });
                }}}>
                <View style={styles.row}>
                    <Image style={styles.productImage} source={rowData.image}>
                    </Image>
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>{rowData.title}</Text>
                        <Text style={styles.productSubTitle}>{rowData.subtitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeprator(sectionId, rowId, adjacentRowHighlighted) {
        return (
            <View style={styles.divider} key={`${sectionId}-${rowId}`}>

            </View>
        );
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _startTimer() {
        this.interval = setInterval(() => {
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 3) {
                nextPage = 0;
            }
            this.setState({currentPage: nextPage});
            const offSetX = nextPage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true});
        }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchbar: {
        marginTop: Platform.OS === 'ios'
            ? 20
            : 0,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10
    }, button: {
        flex: 1
    },
    advertisingment: {
        height: 180
    }, advertisingmentContent: {
        height: 180,
        width: Dimensions.get('window').width
    }, products: {
        flex: 1,
    }, row: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    }, productImage: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center'
    }, productTitle: {
        flex: 3,
        fontSize: 16
    }, productSubTitle: {
        flex: 2,
        fontSize: 14,
        color: 'gray'
    }, productText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    }, divider: {
        height: 1,
        width: Dimensions.get('window').width - 5,
        marginLeft: 5,
        backgroundColor: 'lightgray'
    }
});
