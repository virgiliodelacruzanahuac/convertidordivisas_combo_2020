import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity ,TextInput,Picker} from 'react-native';
import Constants from 'expo-constants';



export default class App extends React.Component {

  state = {
    valor:"0",
   divisaorigen:"USD",
   divisadestino:"USD",
    datos: [],
    datosregresojson :
      {
  rates: {
    CAD: null,
    HKD: null,
    ISK: null,
    PHP: null,
    DKK: null,
    HUF: null,
    CZK: null,
    GBP: null,
    RON: null,
    SEK: null,
    IDR: null,
    INR: null,
    BRL: null,
    RUB: null,
    HRK: null,
    JPY: null,
    THB: null,
    CHF: null,
    EUR: null,
    MYR: null,
    BGN: null,
    TRY: null,
    CNY: null,
    NOK: null,
    NZD: null,
    ZAR: null,
    USD: null,
    MXN: null,
    SGD: null,
    AUD: null,
    ILS: null,
    KRW: null,
    PLN: null,
  },
  base: null,
  date: null
},
divisas :
[
 {
  clave: 'HKD',
  nombre: 'Honk Kong Dolar',
  },
 {
  clave: 'CAD',
  nombre: 'Canada Dolar',
  },
]
}

 asignadivisadestino()
 {
   var  destino= this.state.datosregresojson.rates[this.state.divisadestino];

 }     

  getExchData = async() =>{

    try
    {
      var url = 'https://api.exchangeratesapi.io/latest?base='+ this.state.divisaorigen;
      const response = await fetch(url)
      const datos  = await response.json()
      this.setState({datos})
      this.setState({datosregresojson: datos})
    }
    catch(e)
    {
      console.log(e);
    }
  }


  render() {
    return (
      <View style={styles.container}>
       <Text> De </Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => this.setState({valor: text})}
      value={this.state.valor}
    />
   
      <Text> De </Text>
       
       <Picker mode="dropdown" style={{ height:30, backgroundColor: 'white',width: '80%'}}
       selectedValue={this.state.divisaorigen}  onValueChange={(value) => this.setState({divisaorigen: value})}
       
>
               {
                 this.state.divisas.map((item) =>{
                   return(
                   <Picker.Item  label={item.nombre} value={item.clave} key={item.clave}/>
                   );
                 })
               }
             </Picker>
             <Text> A </Text>
      <Picker mode="dropdown" style={{ height:30, backgroundColor: 'white',width: '80%'}}
      selectedValue={this.state.divisadestino}  onValueChange={(value) => this.setState({divisadestino: value})}
      >
               {
                 this.state.divisas.map((item) =>{
                   return(
                   <Picker.Item  label={item.nombre} value={item.clave} key={item.clave}/>
                   );
                 })
               }
             </Picker>
     <TouchableOpacity onPress={() => this.getExchData()} style={{ padding : 20, backgroundColor: 'green' }}>
<Text> Obtener data </Text>
</TouchableOpacity>
<Text> MEXICAN PESO= {JSON.stringify(this.state.datosregresojson.rates.MXN)} </Text>
<Text> LIBRA= {JSON.stringify(this.state.datosregresojson.rates.GBP)} </Text>
<Text> YEN= {JSON.stringify(this.state.datosregresojson.rates.JPY)} </Text>
<Text> Salida = {parseFloat(this.state.datosregresojson.rates[this.state.divisadestino])*parseFloat(this.state.valor)} </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: '',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});

