import React, { Component } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'

const track1 = require('./music/ukulele.mp3')
const track2 = require('./music/drums.mp3')
const playlist = [
  {
    uri: track1
  },
  {
    uri: track2
  },
];

SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

export default class App extends Component {
  state = {
    isPlaying: false,
    isPlaying2: false,
    playbackInstance: null,
    volume: 1.0,
    currentTrackIndex: 0,
  }
  

	async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

handlePlayPause = async () => {
  let { isPlaying,  playbackInstance } = this.state;
    await this.handleTrack1()
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying,
      isPlaying2: false
    });
  }
    
  handleTrack1 = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume,
    }; 
    if (currentTrackIndex != 0){
      await playbackInstance.unloadAsync();
      currentTrackIndex = 0;
      this.setState({
      currentTrackIndex
      }); 
      await playbackInstance.loadAsync(playlist[0].uri, status, false);
      this.setState({
      playbackInstance
      });  
    }
  }

  handlePlayPause2 = async () => {
    let { isPlaying2,  playbackInstance } = this.state;
      await this.handleTrack2()
      isPlaying2 ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
      this.setState({
      isPlaying2: !isPlaying2,
      isPlaying: false
    });
  }


  handleTrack2= async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    const status = {
      shouldPlay: this.state.isPlaying2,
      volume: this.state.volume,
    }; 
    if (currentTrackIndex != 1){
      await playbackInstance.unloadAsync();
      currentTrackIndex = 1;
      this.setState({
      currentTrackIndex
      }); 
      await playbackInstance.loadAsync(playlist[1].uri, status, false);
      this.setState({
      playbackInstance
      });  
    }
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = {
      uri: playlist[this.state.currentTrackIndex].uri
    }
		const status = {
			shouldPlay: this.state.isPlaying,
			volume: this.state.volume,
    };
    await playbackInstance.loadAsync(source.uri, status, false);
    this.setState({
      playbackInstance
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.trackInfo, styles.trackInfoText, styles.largeText]}>
          Aloha Music
        </Text>
        <Image source={require('./images/ukulele.png')} style={styles.img}/>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ?
              <Feather name="pause" size={32} color="#563822"/> :
              <Feather name="play" size={32} color="#563822"/>
            }
          </TouchableOpacity>
        </View>

        <Image source={require('./images/drums.png')} style={styles.img}/>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause2}
          >
            {this.state.isPlaying2 ?
              <Feather name="pause" size={32} color="#563822"/> :
              <Feather name="play" size={32} color="#563822"/>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackInfo: {
    width: 350,
    paddingVertical: 5,
    marginVertical: 45,
    backgroundColor: '#da9547',
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#563822'
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  control: {
    margin: 20
  },
  img:{
    height: 210,
    width: 350
  }
});