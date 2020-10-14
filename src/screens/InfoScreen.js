import React from 'react';
import {View, Text, StyleSheet, Button, TextInput, TouchableHighlight,Image} from 'react-native';


const InfoScreen = (props) => {
	return(
      <View style={{flex: 2}}>
        <View style={styles.topContainer}>
          <TouchableHighlight  >
              <Text> Driving info </Text>
          </TouchableHighlight> 
        </View>
        <View style={{flex: 1}}>
          <View style={styles.buttonRowContainer}>
          <TouchableHighlight style={styles.touchableContainer} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> console.log("lane assistant")}>
              <Text > Lane assistant </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchableContainer} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> props.navigation.navigate('Connect')}>
              <Text>disconnect </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchableContainer} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> props.navigation.navigate('Main')}>
              <Text  > Camera </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonRowContainer}>
          <TouchableHighlight  style={styles.minus}  activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> console.log("power down")}>
              <Image source={require('../pictures/minus.png')} style={styles.image}/>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchableContainer} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> console.log("cruise control")}>
              <Text  > cruise control </Text>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.plus} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> console.log("power up")}>
             <Image source={require('../pictures/plus.png')} style={styles.image}/>
          </TouchableHighlight>
        </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
   buttonRowContainer: {
    flex: 1, 
    flexDirection: 'row'
    },
    touchableContainer: {
      backgroundColor: "#89cff0",
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    topContainer: {
      flex: 2, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60
    },
    plus:{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: "#98FB98"
    },
    minus: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: "#F08080"
    }

});

export default InfoScreen;
