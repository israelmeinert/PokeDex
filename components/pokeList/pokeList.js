import React from 'react';
import { StyleSheet,
         View, 
         FlatList,
         Image, 
         Text,
         TouchableHighlight,
         ActivityIndicator } from 'react-native';

function Item({ pokemon }) {
    const {name, image, types} = pokemon
    return (
        <View style={styles.item}>
            <View style={styles.backgroundImage}>
                <Image
                    style={{width: 100, height: 100}}
                    source={{ uri: image }}
                />
            </View>
            <Text >{name}</Text>
            <View>
                { types.map( type => (<Text key={type}>
                        { type }
                    </Text>))
                }
            </View>
        </View>
    );
}

export default class PokeList extends React.Component {
    constructor() {
      super()
    }
  
    render() {
        const { pokemons } = this.props;
      return (
        <View style={styles.list}>
            {
                !pokemons.length ?
                <ActivityIndicator size='large' color='#0000ff' />
                :
                <FlatList
                    data={pokemons}
                    renderItem={({ item }) => <TouchableHighlight 
                    onPress={ e => { this.props.seeDetails(item)} } underlayColor='#f1c40f'>
                        <Item pokemon={item} />
                    </TouchableHighlight> 
                }
                keyExtractor={item => item.id}
                />
            }
            
        </View>
      )
    }
}

const styles = StyleSheet.create({
    list: {
        width: '92%',
        backgroundColor: '#D57272'
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }, 
  });


  