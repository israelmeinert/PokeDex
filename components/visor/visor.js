import React from 'react';
import { StyleSheet, View, Image, Text, FlatList } from 'react-native';


export default class Visor extends React.Component {

    renderImage = pokemon => <Image
            style={{width: 200, height: 200}}
            source={{ uri: pokemon.image }}
            />
	
	rendeAbilites = pokemon => <FlatList
            data={pokemon.moves}
            renderItem={({ item }) => <Text > {item} </Text>
            }
            keyExtractor={item => item}
        />
  
    render() {
        const { pokemon } = this.props;
      return (
        <View style={styles.visor}>
            {
                pokemon &&
                <View>
                    <View style={styles.firstRow}>
                        <View >
                            {this.renderImage(pokemon)}
                        </View>
                        <View style={styles.abilitesList}>
                            <Text style={styles.text}>Abilities</Text>
                            {this.rendeAbilites(pokemon)}
                        </View>
                    </View>

                    <View style={styles.containerName}>
                        <Text style={styles.text} >{pokemon.name}</Text>
                        <View>
                            <Text style={styles.text}>Types: </Text>
                            { pokemon.types.map( type => (<Text key={type}>
                                    { type }
                                </Text>))
                            }
                        </View>
                    </View>
                </View>
            }
        </View>
      )
    }
  
}

const styles = StyleSheet.create({
    visor: {
      width: '92%',
      height: '40%',
      backgroundColor: '#c1d990',
      flexDirection: 'column',
    },
    firstRow: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    abilitesList: {
        paddingTop: 7,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '75%',
        backgroundColor: '#a5cd53',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerName: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
  });
  