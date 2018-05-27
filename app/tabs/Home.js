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
    Slider,
    RefreshControl,
    
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
import Masonry from 'react-native-masonry-layout';
import FastImage from 'react-native-fast-image'

const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            appIsReady:false,
            searchClearIcon: false,
            newProductList:[{
                name:"Product 1",
                image:""
            }],
            modalVisible: false,
            modalVisibleRegister: false,

            withHeight: false,
            loading: false,
            isRefreshing:false,
        }
      
    }
    componentDidMount(){
        //const {sanPhamTrangChuReducer,dispatch} =this.props;
       
        //lay dssp
        //dispatch(sanPhamTrangChuReducer());

        const {sanPhamTrangChuReducer,dispatch} = this.props; 
        dispatch(fetchSanPhamTrangChu());

        this.load();
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

    load() {
      this.setState( { loading: true } );
      fetch( "http://huaban.com/boards/17649987/?limit=10", {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then( res => res.json() )
        .then( data => {
          this.setState( { loading: false } );
          data = data.board.pins.map( item => {
            return {
              image: "http://img.hb.aicdn.com/" + item.file.key,
              text: item.raw_text,
              key: item.file.key,
              height: columnWidth / item.file.width * item.file.height
            }
          } );
          if ( this.state.withHeight ) {
            this.refs.list.addItemsWithHeight( data );
          } else {
            this.refs.list.addItems( data );
          }
        } );
    }

    onScrollEnd( event ) {
      return;
      const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
      const height = Math.floor( event.nativeEvent.contentSize.height );
      if ( scrollHeight >= height ) {
        this.load();
      }
    }
  
    render(){ 
        return (
        	<View style={{ flex: 1, backgroundColor: "#EEE" }}>
            <Masonry onMomentumScrollEnd={this.onScrollEnd.bind( this )}
                style={{ flex: 1, borderWidth: 1, borderColor: "red" }}
                columns={2} ref="list"
                containerStyle={{ padding: 5 }}
                refreshControl={<RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  tintColor="#ff0000"
                  title="Loading..."
                  titleColor="#00ff00"
                  colors={[ '#ff0000', '#00ff00', '#0000ff' ]}
                  progressBackgroundColor="#ffff00"
                />}
                renderItem={item => <View
                  style={{
                    margin: 5,
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#dedede"
                  }}>
                  <FastImage
                    style={{ height: item.height }}
                    source={{
                      uri: item.image,
                      headers:{ Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                 
                  <Text style={{ padding: 5, color: "#444" }}>{item.text}</Text>
                </View>}/>

            {this.state.loading && <View style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.3)"
            }}>
              <Text style={{
                backgroundColor: "#fff",
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderRadius: 10
              }}>加载中</Text>
            </View>}
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