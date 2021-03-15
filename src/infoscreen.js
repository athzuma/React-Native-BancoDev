import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { hideCreditCard, formatPrice, getFlag, iconNameFlag } from './auxFunctions';

import { FontAwesome5 } from '@expo/vector-icons';

export default class InfoScreen extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    const { paymentSetup, pagamento, cliente, cartaoCredito, makePayment } = this.props;
    return (
      <>
        <Text style={[styles.title, { color: paymentSetup.color.primary } ]}>Concluir pagamento</Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontSize: 18, color: '#777' }}>Total:</Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: paymentSetup.color.secondary }}>R$ {formatPrice(pagamento.valor)}</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#EEE' }}/>

        <Text style={{ fontSize: 10, color: '#AAA', marginTop: 10, }}>Cartão de crédito</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View>

            <Text style={{ fontSize: 20, color: '#777' }}>{hideCreditCard(cartaoCredito.numeroCartao)}</Text>
          </View>

          <FontAwesome5 name={iconNameFlag(cartaoCredito.numeroCartao)} size={30} color={paymentSetup.color.primary} />

        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: paymentSetup.color.primary }]} onPress={() => { this.props.makePayment() }}>
          <Text style={styles.btnText}>PAGAR</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500'
  },
  text: {
    textAlign: 'justify',
    marginTop: 20,
  },
  btn: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    fontWeight: '600'
  },
});
