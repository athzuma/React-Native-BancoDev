import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

export default class FailScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { error = "", paymentSetup, onClose } = this.props;
    return (
      <>
        { error !== "" &&
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 40,
              }}
            >
              <Feather name="alert-triangle" size={50} color={(paymentSetup.color.fail) ? paymentSetup.color.fail : 'red'} />
              <Text
                style={{
                  color: (paymentSetup.color.fail) ? paymentSetup.color.fail : 'red',
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 20,
                }}
              >
                {error}
              </Text>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: (paymentSetup.color.fail) ? paymentSetup.color.fail : 'red' }]} onPress={onClose}>
              <Text style={styles.btnText}>ENCERRAR</Text>
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
