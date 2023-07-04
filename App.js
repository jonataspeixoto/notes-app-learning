import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [state, setState] = useState('reading')
  const [note, setNote] = useState('')

  if(state == 'reading'){
    return (
      <View style={{flex: 1}}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.header}>
          <Text style={{textAlign:'center', color:'white'}}>Notes App</Text>
        </View>
        {
          (note != '') ? 
          <View style={{padding: 20}}>
            <Text style={styles.note}>{note}</Text>
          </View>
          :
          <View style={{padding: 20}}>
            <Text style={{opacity:0.3}}>No notes found :(</Text>
          </View>
        }
        <TouchableOpacity onPress={() => setState('updating')} style={styles.btnSave}>
          <Text style={styles.btnNoteText}>Edit</Text>
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
        <TextInput style={{textAlign:'justify', fontSize:13, textAlignVertical:'top', padding:20, height:300}} onChangeText={(text) => setNote(text)} multiline={true} numberOfLines={5} value={note}></TextInput>
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
    borderRadius: 25,
    textAlign:'justify'
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