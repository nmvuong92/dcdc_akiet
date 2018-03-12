import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import Header from './../../common/components/Header';
import Loading from './../../common/components/Loading';
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            mobile: '',
            password: '',
            code:'',
            verifyCodeText:"",
            user:{},
        };
        this.timer = null;
        this.timeHit = 0;
       
    }
    componentDidMount(){
        this._getCaptcha();
    }
    _getCaptcha(){
         var text = "";
        //ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        var possible = "0123456789";
        
        for (var i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        this.setState({
            verifyCodeText:text
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <Header
                        showBack={true}
                        //leftIcon='angle-left'
                        //leftIconAction={()=>this.goBack()}
                    
                        //rightIcon='trash'
                        //rightIconAction={()=>{}}

                        // rightIcon2='heart'
                        // rightIconAction2={()=>this.goBack()}

                        //showCartBadgeIcon={true}
                        //CartBadgeIconAction={()=>this.goBack()}
                        title={"Đăng ký thành viên"}
                />
                    
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('./../../assets/images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='Tài khoản email'
                        style={styles.loginInput}
                        onChangeText={this._onChangeMobile.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='Mật khẩu'
                        onChangeText={this._onChangePassword.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('./../../assets/images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder={'Mã xác nhận nhập: '+this.state.verifyCodeText}
                        onChangeText={this._onChangeCode.bind(this)} />
                    <TouchableOpacity style={styles.verifyCodeBtn} onPress={this._getCaptcha.bind(this)}>
                        <Text ref="btnSendVCode" style={styles.verifyCodeText}>{this.state.verifyCodeText}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.registerBtn} onPress={this._register.bind(this)}>
                    <Text style={styles.registerText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        );
    };

    
    _onChangeMobile(text) {
        this.state.mobile = text;
        // this.setState({'mobile': text});
    }

    _onChangePassword(text){
        this.state.password = text;
        // this.setState({'password': text});
    }

    _onChangeCode(text){
        this.state.code = text;
        // this.setState({'code': text});
    }

    _sendVerifyCode(){
       
    };

    _register(){
        let {mobile, password, code} = this.state;

        /*
        if (!mobile.length) {
            Toast.show('请输入正确的手机号', {position:Toast.positions.CENTER});
            return;
        }
        if (password.length < 6) {
            Toast.show('密码必须大于6位', {position:Toast.positions.CENTER});
            return;
        }
        if (!code.length) {
            Toast.show('请输入验证码', {position:Toast.positions.CENTER});
            return;
        }*/

        InteractionManager.runAfterInteractions(() => {
            //const {dispatch} = this.props;
         
        });
    };
}

const mapStateToProps = state=>({
    navReducer:state.navReducer,
    cartReducer:state.cartReducer,
 });
 //khong can chia se nen connect rong
 //khi ma exprt connect ==> co 1 bien dispatch
 export default connect(mapStateToProps)(Register);


 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 17,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex:1,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },

    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    verifyCodeBtn: {
        backgroundColor: '#c5523f',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:'center',
        width: 80,
        height: 30,
        borderRadius: 2,
    },
    verifyCodeText: {
        color: '#ffffff',
    },

    registerBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    registerText:{
        color:'#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});
