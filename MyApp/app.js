import React, { Component } from 'react';
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
    StatusBar
} from 'react-native';


export default class app extends Component {
    constructor(props){
        super(props);
        // const ds = new ListView.dataSource({
        //     rowHasChanged:(r1,r2) => r1 !== r2
        // });
        const ds = new ListView.DataSource({ // 创建ListView.DataSource数据源
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            currentPage:0,
            dataSource : ds.cloneWithRows([
                '商品1',
                '商品2',
                '商品3',
                '商品4',
                '商品5',
                '商品6',
                '商品7',
                '商品8',
                '商品9',
                '商品0',
            ])
        };
    }
    render (){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'blue'} barStyle={'default'} networkActivityIndicatorVisible={true}>

                </StatusBar>
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索商品'>
                    </TextInput>
                    <Button style={styles.button} title='search' onPress={()=> Alert.alert('点击了搜索',null,null)}></Button>
                </View>
                <View style={styles.advertisingment}>
                    <ScrollView ref='scrollView' horizontal={true} pagingEnabled={true}>
                        <TouchableHighlight onPress={()=>Alert.alert('点击了第一个轮播图')}>
                        <Text style={
                            {width:Dimensions.get('window').width,
                                height:180,
                                backgroundColor:'gray'}
                        }>
                            产品1
                        </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>Alert.alert('点击了第二个轮播图',null,null)}>
                        <Text style={
                            {width:Dimensions.get('window').width,
                                height:180,
                                backgroundColor:'red'}
                        }>
                            产品2
                        </Text></TouchableHighlight>
                        <TouchableHighlight onPress={()=>Alert.alert('点击了第三个轮播图',null,null)}>
                        <Text style={
                            {width:Dimensions.get('window').width,
                                height:180,
                                backgroundColor:'blue'}
                        }>
                            产品3
                        </Text></TouchableHighlight>
                    </ScrollView>

                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                </View>
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID)  {
        return (
<TouchableHighlight onPress={()=>Alert.alert('点击了商品列表',null,null)}>
                <View style={styles.row}>
                    <Text>{rowData}</Text>
                </View>
</TouchableHighlight>
        );
    }


    componentDidMount(){
        this._startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    _startTimer(){
        this.interval = setInterval(() => {
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 3){
                nextPage = 0;
            }
            this.setState({currentPage:nextPage});
            const offSetX = nextPage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x:offSetX,y:0,animated:true});
        },2000);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    searchbar:{
        marginTop:Platform.OS === 'ios'
            ?20
            :0,
        height:40,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    input:{
        flex:1,
        borderColor:'gray',
        borderWidth:2
    },button:{
        flex:1
    },
    advertisingment:{
        height:180
    },products:{
        flex:1,
    },row:{
       height:60,
       justifyContent:'center',
       alignItems:'center'
    }
});
