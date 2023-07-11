import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import uuid from 'react-native-uuid';

export default function App() {
    const titleNote = 'Lorem ipsum dolor sit amet.'
    const contentNote = 'Lorem ipsum dolor sit amet. Ea explicabo pariatur ut impedit laboriosam ut eaque dolor. Eos consequatur beatae et voluptatem sint qui deleniti mollitia eum iure sequi et asperiores incidunt! Et beatae molestiae id placeat facilis non suscipit excepturi qui illo doloribus!\nQui aperiam autem sed doloremque repellat et rerum eius sit asperiores beatae non quia ducimus est consequuntur sint in nulla cupiditate. Ut voluptas dignissimos quo assumenda temporibus ab necessitatibus iure. Aut laborum ipsum ex animi inventore qui omnis maxime et quaerat enim!'

    const [showBox, setShowBox] = useState(true);
    const [state, setState] = useState('reading');
    const [currentNoteId, setCurrentNoteId] = useState('');
    const [currentNoteTitle, setCurrentNoteTitle] = useState('');
    const [currentNoteContent, setCurrentNoteContent] = useState('');
    const [notes, setNotes] = useState([]);

    const save = async () => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
        } catch (err) {
            alert(err);
        }
    };

    const load = async () => {
        try {
            let notes = JSON.parse(await AsyncStorage.getItem('notes'));
            
            if (notes !== null) {
                setNotes(notes);
            } else {
                setNotes([])
            }
        } catch (err) {
            alert(err);
        }
    };

    const saveNote = () => {
        const item = notes.find((item) => item.id == currentNoteId);

        if (item) {
            notes[notes.indexOf(item)] = {
                id: currentNoteId,
                title: currentNoteTitle,
                content: currentNoteContent
            }
        } else {
            notes.push({
                id: currentNoteId,
                title: currentNoteTitle,
                content: currentNoteContent
            })
        }
        save();
        console.log(notes);
    };

    const deleteNote = (id) => {
        const item = notes.find((item) => item.id == id);

        if (item) {
            const index = notes.indexOf(item);
            notes.splice(index, 1);
        }

        save();
    };
    const loadHeader = (text) => {
        return (
            <View>
                <StatusBar style='light'></StatusBar>
                <View style={styles.header}>
                    <Text numberOfLines={1} style={styles.txtHeader}>{text}</Text>
                </View>
            </View>
        )
    };

    const loadEditableHeader = () => {
        return (
            <View>
                <StatusBar style='light'></StatusBar>
                <View style={styles.header}>
                    <TextInput placeholder='Enter the title of your note' placeholderTextColor='#d2d2d2' autoFocus={true} style={styles.txtHeader} onChangeText={(text) => setCurrentNoteTitle(text)} multiline={true} numberOfLines={1} value={currentNoteTitle}></TextInput>
                </View>
            </View>
        )
    }

    const setCurrentNoteIndex = (note) => {
        setCurrentNoteId(note.id);
        setCurrentNoteTitle(note.title);
        setCurrentNoteContent(note.content);
    }

    const noteItem = (note) => {
        return (
            <View key={note.id}>
                <TouchableOpacity
                    onPress={
                        () => {
                            // console.log("Press")
                            setState('writing'); setCurrentNoteIndex(note); 
                        }
                    }
                    onLongPress={
                        () => {
                            console.log("LongPress")
                            // setState('writing'); setCurrentNoteIndex(note);
                        }
                    }
                    style={styles.noteItem}
                >
                    <Text numberOfLines={1} style={styles.titleNote}> {note.title} </Text>
                    <Text numberOfLines={2} style={styles.contentNote}> {note.content} </Text>
                </TouchableOpacity>
                {notes.indexOf(note) != notes.length - 1 ? <View style={{ flex: 1, height: 2, marginHorizontal: 50, backgroundColor: 'black', opacity: 0.1 }} /> : <></>}
            </View>
        )
    }

    const createNewNote = () => {
        const id = uuid.v4();
        const note = {
            id: id,
            title: '',
            content: ''
        }
        setCurrentNoteId(note.id);
        setCurrentNoteTitle(note.title);
        setCurrentNoteContent(note.content);
    }

    const loadNotesMenu = (notes) => {
        let content = '';
        if (notes.length <= 0) {
            content = <Text style={{ opacity: 0.3, margin: 20 }}>No notes found :(</Text>
        } else {
            content = notes.map((note) => {
                return noteItem(note)
            })
        }
        return (
            <ScrollView style={{}}>
                {content}
            </ScrollView>
        )
    }

    useEffect(() => {
        load();
    }, []);

    const showConfirmDialog = (id) => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this note?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        deleteNote(id);
                        setState('reading');
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    if (state == 'reading') {
        return (
            <View style={{ flex: 1, backgroundColor: '#e6e7eb' }}>
                {loadHeader('Notes App')}
                {loadNotesMenu(notes)}
                <TouchableOpacity onPress={() => { setState('writing'); createNewNote(); }} style={styles.btnNote}>
                    <Text style={styles.btnNoteText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (state == 'writing') {
        return (
            <View style={{ flex: 1 }}>
                {loadEditableHeader()}
                <TextInput placeholder='Write your note here' autoFocus={true} style={styles.note} onChangeText={(text) => setCurrentNoteContent(text)} multiline={true} numberOfLines={5} value={currentNoteContent}></TextInput>
                <TouchableOpacity onPress={() => { setState('reading'); saveNote(); }} style={styles.btnSave}>
                    <Text style={styles.btnNoteText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { showConfirmDialog(currentNoteId); }} style={styles.btnDelete}>
                    <Text style={styles.btnNoteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    txtHeader: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        fontSize: 17
    },
    header: {
        width: '100%',
        padding: 25,
        backgroundColor: '#069'
    },
    note: {
        textAlign: 'justify',
        fontSize: 13,
        textAlignVertical: 'top',
        padding: 20,
        maxHeight: 300
    },
    btnNote: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        backgroundColor: '#069',
        borderRadius: 25,
        textAlign: 'justify'
    },
    btnNoteText: {
        color: 'white',
        position: 'relative',
        textAlign: 'center',
        top: 3,
        fontSize: 30
    },
    btnSave: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 100,
        height: 50,
        backgroundColor: '#069',
        borderRadius: 25
    },
    btnDelete: {
        position: 'absolute',
        left: 20,
        bottom: 20,
        width: 100,
        height: 50,
        backgroundColor: '#F20',
        borderRadius: 25
    },
    noteItem: {
        borderRadius: 7,
        borderColor: '#DDD',
        borderStyle: 'solid',
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        height: 100,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    titleNote: {
        fontSize: 15,
        fontWeight: 500,
        padding: 3,
    },
    contentNote: {
        paddingHorizontal: 5
    },
});