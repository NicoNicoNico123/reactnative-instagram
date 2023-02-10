import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet,
        Text, View ,FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Stories from './Stories';
import data from './data';
import Constants from 'expo-constants'
import Article from './Article';

const INSTAGRAM_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Google_logo_%282013-2015%29.svg/1125px-Google_logo_%282013-2015%29.svg.png'

export default function Instagram() {

  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back)

  function renderItem({ item, index }) {
    return (
      <>
        {index === 0 && (
          <View style={styles.stories}>
            <Stories stories={data.stories} profile={data.profile} />
          </View>
        )}
        <Article item={item} />
      </>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>
        
    <View style={styles.header}>
      <TouchableOpacity>
        <Feather name="camera" size={24} 
        onPress={()=> {
          setShowCamera(!showCamera);
          setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)

        }}

        />
      </TouchableOpacity>
      <Image source={{uri: INSTAGRAM_LOGO}} style={styles.logo}/>
      
      <TouchableOpacity>
        <Feather name="send" size={24} />
      </TouchableOpacity>
      </View>

      <FlatList
        data={data.articles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />  

        {
          showCamera && (
            <Camera style={styles.camera} type={cameraType} >
                <View style={styles.cameraContainer}>
                  <TouchableOpacity onPress={()=> setShowCamera(false)}>
                    <Feather name='x' size={24} color='white' />
                  </TouchableOpacity>
                </View>

            </Camera>

          )

        }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTime:Constants.statusBarHeight
  },
  header:{
    borderBottomWidth:1,
    borderBottomColor:'#dbdbdb',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    paddingHorizontal:16,
  },
  logo:{
    flex:1,
    height:30,
    resizeMode:"contain"
  },
  stories: {
    borderBottomWidth:1,
    borderBottomColor:'#dbdbdb',
    height: 104,
    padding: 10,
    backgroundColor: '#fafafa'
  }
});

