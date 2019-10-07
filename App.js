import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, } from 'react-native';
import Visor from './components/visor/visor';
import PokeList from './components/pokeList/pokeList';
import PokedexAPI from './api/pokedexApi';

const api = new PokedexAPI();

export default function App() {

  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    api
      .list()
      .then( pokemons => { 
        setPokemons(pokemons)
      });
  }, []);

  return (
    <View style={styles.container}>
      <Visor pokemon={pokemon} ></Visor>
      <View style={styles.controllButtons} >
        <Button style={styles.buttons} disabled={api.preLoadList && !api.preLoadList.previous } 
          title='Previous'
          onPress={ (e)=> {
            setPokemons([])
            api.previous().then(newPokemons => setPokemons(newPokemons))
          } }
        ></Button>
        <Button style={styles.buttons} 
          disabled={api.preLoadList && !api.preLoadList.next}
          title='Next' 
          onPress={ (e)=> {
            setPokemons([])
            api.next().then(newPokemons => setPokemons(newPokemons))
          } }>''</Button>
      </View>
      <PokeList pokemons={pokemons} seeDetails={setPokemon} ></PokeList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e61515',
    alignItems: 'center',
    paddingTop: 23
  }, 
  controllButtons: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
