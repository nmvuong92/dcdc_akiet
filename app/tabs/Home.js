import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    Platform,
    TouchableHighlight,
    Slider
} from 'react-native';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import IconBadge from 'react-native-icon-badge';

import {VCOLOR} from './../common/constants';

import { SearchBar } from 'react-native-elements';

import {connect} from 'react-redux';
import { fetchFoodInfo,fetchFood } from './../actions/ProductAction';

import LoadMoreFooter from './../common/components/LoadMoreFooter';
import {NavigationActions} from 'react-navigation';

import {HeadPadding,formatVND,vStyles} from './../common/vUtils';
import {fetchSanPhamTrangChu} from './../actions/sanPhamTrangChuAction';
import Loading from './../common/components/Loading';
import CartBadgeIcon from './../common/components/cartBadgeIcon';

import CornerLabel from './../components/CornerLabel';
import LoadingActivityIndicator from './../common/components/LoadingActivityIndicator';
import Header from './../common/components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Modal from 'react-native-modalbox';
let deviceWidth= Dimensions.get('window').width;
import Swiper from 'react-native-swiper';
import Masonry from 'react-native-masonry';
import FastImage from 'react-native-fast-image'
// list of images
let data = [
    {
      data: {
        caption: 'Summer Recipies',
        user: {
          name: 'Henry'
        },
      },
      uri: 'https://s-media-cache-ak0.pinimg.com/736x/32/7f/d9/327fd98ae0146623ca8954884029297b.jpg',
      renderFooter: (data) => {
        return (
          <View key='brick-header' style={{backgroundColor: 'white', padding: 5, paddingRight: 9, paddingLeft: 9}}>
            <Text style={{lineHeight: 20, fontSize: 14}}>{data.caption}</Text>
          </View>
        )
      },
      renderHeader: (data) => {
        return (
          <View key='brick-footer' style={styles.headerTop}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsO3JMW5pmK-pq9g3T-1znMMK8IEELKnasQ6agJANePV7Z0nwp9w' }}
              style={styles.userPic}/>
            <Text style={styles.userName}>{data.user.name}</Text>
          </View>
        )
      }
    },
    {
      uri: 'https://s-media-cache-ak0.pinimg.com/736x/b1/21/df/b121df29b41b771d6610dba71834e512.jpg',
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpD8mz-2Wwix8hHbGgR-mCFQVFTF7TF7hU05BxwLVO1PS5j-rZA',
    },
    {
      uri: 'https://s-media-cache-ak0.pinimg.com/736x/5a/15/0c/5a150cf9d5a825c8b5871eefbeda8d14.jpg'
    },
    {
      uri: 'https://s-media-cache-ak0.pinimg.com/736x/04/63/3f/04633fcc08f9d405064391bd80cb0828.jpg'
    },
    {
      uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQRWkuUMpLyu3QnFu5Xsi_7SpbabzRtSis-_QhKas6Oyj3neJoeug'
    },
    {
      uri: 'https://s-media-cache-ak0.pinimg.com/736x/a5/c9/43/a5c943e02b1c43b5cf7d5a4b1efdcabb.jpg'
    },
    {
      uri: 'https://i0.wp.com/www.youbodyhealth.com/wp-content/uploads/2016/08/Delicious-Foods-can-Harm-Your-Brain.jpg?'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/29/15/campaign_images/buzzfeed-prod-fastlane-03/26-delicious-korean-foods-you-need-in-your-life-2-30138-1490814365-13_dblbig.jpg',
    },
    {
      uri: 'https://pbs.twimg.com/media/B59AOmICQAAiGGj.png',
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr05/17/17/enhanced-buzz-orig-2548-1387320822-8.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-03/17/15/enhanced/webdr13/enhanced-6527-1426620797-18.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/1/15/enhanced/webdr02/enhanced-18393-1417466529-5.jpg'
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXTmdaGSOFK8iBeYqoA6_XiQGGWvu6KGnqAxXYyvJA-JKin8ImQ'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-04/3/15/enhanced/webdr06/enhanced-24427-1428089292-2.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/28/12/asset/buzzfeed-prod-web-09/sub-buzz-24236-1482944714-1.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-03/7/17/enhanced/webdr08/enhanced-buzz-8155-1457391039-5.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/30/12/asset/buzzfeed-prod-fastlane-01/sub-buzz-24597-1490890739-1.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/14/20/campaign_images/webdr15/which-delicious-mexican-food-item-are-you-based-o-2-20324-1452822970-1_dblbig.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-11/30/10/enhanced/webdr15/enhanced-18265-1448896942-17.jpg'
    },
    {
      uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-12/30/16/enhanced/webdr04/enhanced-15965-1451509932-6.jpg'
    }
  ];
  
  const addData = [
    {
      uri: 'https://i.pinimg.com/736x/48/ee/51/48ee519a1768245ce273363f5bf05f30--kaylaitsines-dipping-sauces.jpg'
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYfU5N8lsJepQyoAigiijX8bcdpahei_XqRWBzZLbxcsuqtiH'
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPL2GTXDuOzwuX5X7Mgwc3Vc9ZIhiMmZUhp3s1wg0oHPzSP7qC'
    }
  ];


class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            appIsReady:false,
            data:[],
            searchClearIcon: false,
            newProductList:[{
                name:"Product 1",
                image:""
            }],
            modalVisible: false,
            modalVisibleRegister: false,


            columns: 2,
            padding: 5,
            data
        }
    }
    componentDidMount(){
        //const {sanPhamTrangChuReducer,dispatch} =this.props;
       
        //lay dssp
        //dispatch(sanPhamTrangChuReducer());

        const {sanPhamTrangChuReducer,dispatch} = this.props; 
        dispatch(fetchSanPhamTrangChu());
    }
      
    _onChangeSearchText = (searchText) => {
        if (searchText) {
        this.setState({searchClearIcon: true})
        } else {
        this.setState({searchClearIcon: false})
        }
    }
   
    _renderSwiper(){
        return(
            <Swiper style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
                </View>
        </Swiper>
       );
    }
    _addData = () => {
        const appendedData = [...data, ...addData];
        this.setState({
          data: appendedData
        });
    }
    render(){ 
        return (
            <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
              <View style={[styles.center, styles.header]}>
                <Text style={{ fontWeight: '800', fontSize: 20 }}>Masonry Demo</Text>
              </View>
      
              <View style={[styles.center, styles.buttonGroup, { marginTop: 10, marginBottom: 25 }]}>
                <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 2 })}>
                  <Text>2 Column</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 3 })}>
                  <Text>3 Columns</Text>
                </TouchableHighlight>
                <TouchableHighlight  style={styles.button} onPress={() => this.setState({ columns: 6 })}>
                  <Text>6 Columns</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 9 })}>
                  <Text>9 Columns</Text>
                </TouchableHighlight>
              </View>
      
              <View style={[styles.buttonGroup,{marginLeft:4}]}>
                <TouchableHighlight style={styles.button} onPress={this._addData}>
                  <Text>Push New Data</Text>
                </TouchableHighlight>
              </View>
      
              <View style={[styles.center, styles.slider, { marginTop: 10, marginBottom: 25, flexDirection: 'column'}]}>
                <View style={{paddingLeft: 10}}>
                  <Text>Dynamically adjust padding: {this.state.padding}</Text>
                </View>
                <View style={{width: '100%'}}>
                  <Slider
                    style={{height: 10, margin: 10}}
                    maximumValue={40}
                    step={5}
                    value={20}
                    onValueChange={(value) => this.setState({padding: value})} />
                </View>
              </View>
      
              <View style={{flex: 1, flexGrow: 10, padding: this.state.padding}}>
                <Masonry
                  sorted
                  bricks={this.state.data}
                  columns={this.state.columns}
                  customImageComponent={FastImage}/>
              </View>
            </View>
          );
    }
    

    _onLoginSuccess() {
        this.setState({modalVisible: !this.state.modalVisible});
    }
    _onRegisterSuccess() {
        this.setState({modalVisibleRegister: !this.state.modalVisibleRegister});
    }
}
const mapStateToProps = state => ({
    navReducer:state.navReducer,
    authReducer:state.authReducer,
    sanPhamTrangChuReducer:state.sanPhamTrangChuReducer,
   
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      flex: 1,
      flexBasis: '10%'
    },
    header: {
      flexGrow: 1
    },
    buttonGroup: {
      flexGrow: 1
    },
    slider: {
      flexGrow: 1
    },
    button: {
      backgroundColor: '#dbdcdb',
      padding: 10,
      marginRight: 4,
      borderRadius: 4,
      borderBottomColor: '#7b7b7b',
      borderBottomWidth: 5
    },
    buttonText: {
      color: '#404040'
    },
    center: {
      marginTop: 30,
      marginBottom: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    headerTop: {
      flexDirection: 'row',
      padding: 5,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    userPic: {
      height: 20,
      width: 20,
      borderRadius: 10,
      marginRight: 10
    },
    userName: {
      fontSize: 20
    }
  });
  
const stylesz = StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#ffffff',
       
    },
    searchBar:{
       
        flexDirection: 'row',
        backgroundColor: VCOLOR.do_dam,
    },
    banner:{

    },
    banner_img:{
        width: deviceWidth,
        height: deviceWidth * 0.5
    },
    header_menu:{
      
        backgroundColor:VCOLOR.xam,
        paddingTop:3,
        paddingBottom:2,
        
        flexDirection:'row'
    },
    head_btn:{
       alignItems:'center',
       marginRight:10,
    },
    panel:{
        marginBottom: 15,
        borderColor:VCOLOR.xam,
        borderWidth:1,
        paddingBottom: 5,
       
    },
    panel_header:{
        backgroundColor:VCOLOR.do_dam,
        alignItems: 'center',
      
    },
    panel_body:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 5,
    },
    panel_title:{
        color:'white',
    
    },
    product_item:{
        alignItems: 'center',
       
        borderColor:VCOLOR.xam,
        borderWidth:1,
        margin: 2,
        overflow:"hidden",
        borderRadius:5,
        width:'47%',
        padding:3,
    },
    product_item_header:{
      
      
        alignItems: 'center',
    },
    product_item_title:{
       color:'black'
    },
    product_item_body:{

    },
    scroll_container:{
       
    },
    gia:{

    },
    KM:{
        color:"blue",
      
        marginRight:2,
        fontSize:10,
    },
    HOT:{
        color:"red",
     
        marginRight:2,
        fontSize:10,
    },
    NEW:{
        color:"green",
      
        marginRight:2,
        fontSize:10,
    }
});

const stylesX = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  })