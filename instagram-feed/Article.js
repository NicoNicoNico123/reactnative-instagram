import data from "./data";
import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function Article({item}) {

  const article = data.articles.find(article => article.id === item.id);
  const [likes, setLikes] = useState(article?.likes || 0);

  const [commentCount, setCommentCount] = useState(article?.commentCount || 0)
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

function handleComment() {
  Alert.prompt('Leave a comment', "", text => {
    setComment(text);
    setCommentCount(prevCommentCount => prevCommentCount + 1);
  })
}

    return (
        <View style={StyleSheet.article}>
            <View style={styles.header}>
                <View style={styles.user}>
                  {console.log(comment)}
                    <TouchableOpacity>
                        <Image source={item.avatar} style={styles.avatar} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text numberOfLines={1} style={styles.name}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Feather name='more-horizontal' size={16} />
                </TouchableOpacity>
                </View>

                <Image source={item.image} style={styles.image}/>

                <View style={styles.action}>
                    <View style={styles.actionLeft}>

                        <TouchableOpacity style={styles.actionButton}
                        
                        onPress={()=> {
                          setIsLiked(!isLiked);
                          if(isLiked) {
                            setLikes( prevLikes => prevLikes -1)
                          } else {
                            setLikes( prevLikes => prevLikes + 1)
                          }
                        }}
                        
                        >
                            <Feather name='heart' color={isLiked ? "red" : "black"} size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}
                        onPress={handleComment}
                        >
                            <Feather name='message-circle' size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name='send' size={24} />
                        </TouchableOpacity>

                        </View>
                        
                        <View>
                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name='bookmark' size={24} />
                        </TouchableOpacity>
                        </View>
                </View>    
        <View style={styles.info}>
            <Text style={styles.likes}> {likes} Likes</Text>
            <Text style={styles.commentCount}>view all {commentCount} comments</Text>
        </View>
            </View>
    )
}

const styles = StyleSheet.create({
    article: {
      alignItems: 'center',
      marginBottom: 15
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      height: 60
    },
    user: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16
    },
    name: {
      textAlign:'center',
      lineHeight:14,
      color:'#262626',
      marginLeft: 12,
      fontWeight: 'bold',
      fontSize: 12
    },
    image: {
      width: '100%',
      height: null,
      aspectRatio: 1,
      resizeMode:'contain',
      backgroundColor:'red',
      margin:0,
      padding:0
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
      paddingHorizontal: 8
    },
    actionLeft: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    actionButton: {
      marginRight: 8
    },
    info: {
      paddingHorizontal: 15
    },
    likes: {
      fontWeight: 'bold',
      color:'#262626',
      marginBottom: 6,
      marginTop: 6
    },
    comments: {
      fontSize: 10,
      color: 'grey',
      marginBottom: 5
    },
  });
  