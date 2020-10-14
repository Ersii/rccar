import React from 'react';
import {View, Text, StyleSheet, Button, TextInput, TouchableHighlight} from 'react-native';
import io from 'socket.io-client';


export default class ConnectScreen extends Component{
	constructor(props){
		super(props)
		this.state = {
			ip: "192.168.1.172", //ip rpi
			connecting: false,
		}

		return(
			<View style={styles.container}>
				<Text style={styles.txt}>Connect to IP:</Text>
				<TextInput
					style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
				/>
				<TouchableHighlight style={styles.button} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={this.connectWifi()}>
					<Text style={styles.txt}> CONNECT </Text>
				</TouchableHighlight>
			</View>
		);

	}

	connectWifi(){
		let socketIO = io("http://"+this.state.ip+":9000", {transports:['websocket']});
		this.setState({connecting:true});
		console.log("connecting to http://"+this.state.ip+":9000 ...");

		socketIO.on('connection_successful', () =>{
			this.props.navigation.navigate('Main', {socketIO, ip:this.state.ip});
			this.setState({connecting:false});
		});

		//ak nepride potvrdenie zo servera do 3.5s tak connection failed
		setTimeout(() =>{
			if(this.state.connecting){
				this.setState({connecting:false});
				socketIO.disconnect();
				console.log("connection failed");
			}
		},3500);
	}


}


/*const ConnectScreen = (props) => {
//console.log(props);
	return(
		<View style={styles.container}>
			<Text style={styles.txt}>Connect to IP:</Text>
			<TextInput
      			style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
    		/>
			<TouchableHighlight style={styles.button} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={this.connectWifi()}>
        		<Text style={styles.txt}> CONNECT </Text>
      		</TouchableHighlight>
  		</View>
	);
}*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: "50%",
		alignSelf:'center',
		
  },
  	button:{
  		alignSelf:'center',
  		backgroundColor: "#89cff0",
  		width: "100%",
  		
  	},
  	txt:{
  		alignSelf:'center',
  		fontSize: 50,

    }
});


//export default ConnectScreen;
