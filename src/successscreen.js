import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default class SuccessScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { paymentSetup, onClose } = this.props;
    return (
      <>
        { true &&
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 40,
              }}
            >
              <AntDesign name="checkcircleo" size={50} color={(paymentSetup.color.success) ? paymentSetup.color.success : 'green'} />
              <Text
                style={{
                  color: (paymentSetup.color.success) ? paymentSetup.color.success : 'green',
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 20,
                }}
              >
                Pagamento concluído com sucesso!
              </Text>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: (paymentSetup.color.success) ? paymentSetup.color.success : 'green' }]} onPress={onClose}>
              <Text style={styles.btnText}>CONTINUAR</Text>
            </TouchableOpacity>
          </>
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    fontWeight: '600'
  },
});
