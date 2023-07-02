import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [state, setState] = useState('reading')
  const [note, setNote] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas ligula vitae consectetur volutpat. Proin vestibulum, ligula eu ultricies gravida, nibh ligula dapibus nunc, non condimentum nunc augue ullamcorper est. Aliquam pellentesque nunc sit amet venenatis luctus. Duis eget tempus tortor, id feugiat urna. Etiam porta dui ornare feugiat efficitur. Ut sit amet lectus porttitor, venenatis quam in, rhoncus velit. Aenean dignissim lacus sit amet vulputate dictum.\nInteger tempus magna in bibendum vestibulum. Morbi congue nulla quis mauris bibendum, eu viverra quam posuere. Maecenas dapibus hendrerit vehicula. In tempor ac ex vel dictum. Phasellus ornare, enim in pharetra fermentum, leo erat egestas leo, in egestas quam nisi at orci. Phasellus et turpis hendrerit, iaculis turpis a, tincidunt leo. Nulla hendrerit ultrices laoreet. Morbi in dolor id quam venenatis placerat sit amet vitae mauris. Aenean aliquet orci eget dignissim egestas. Aenean eget mi ut eros rutrum rhoncus. Pellentesque at erat risus. Duis sodales condimentum metus a congue. Etiam non diam ut lorem dictum facilisis. Sed eu tempor nunc, et condimentum sapien. Donec tempor tristique massa id euismod.')


  if(state == 'reading'){
    return (
      <View style={{flex: 1}}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.header}>
          <Text style={{textAlign:'center', color:'white'}}>Notes App</Text>
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.note}>{note}</Text>
        </View>
        <TouchableOpacity onPress={() => setState('updating')} style={styles.btnNote}>
          <Text style={styles.btnNoteText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (state == 'updating'){
    return (
      <View style={{flex: 1}}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.header}>
          <Text style={{textAlign:'center', color:'white'}}>Notes App</Text>
        </View>
        <View style={{padding: 20}}>
        </View>
        <TouchableOpacity onPress={() => setState('reading')} style={styles.btnSave}>
          <Text style={styles.btnNoteText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }  
};

const styles = StyleSheet.create({
  header:{
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },
  note:{
    fontSize: 13
  },
  btnNote:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },
  btnNoteText:{
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    fontSize: 30
  },
  btnSave:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  }
});