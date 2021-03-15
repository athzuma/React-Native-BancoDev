# React Native BancoDev
 Make payments with credit cards in your app easily with the BancoDev library

 ## Install

 `$ npm i react-native-bancodev`

 or

 `$ yarn add react-native-bancodev`

 ## Usage

 Example of use

 ```jsx

  const paymentSetup = {
    merchantID: '',
  	merchantKEY: '',
    sandbox: false,
  	softDescriptor: 'MINHALOJA',
    color: {
      primary: '#1600BF',
      secondary: '#6DDD32',
      background: '#DDDDDD',
  		success: 'green',
  		fail: 'red'
    }
  };

   showMenu() {

     const pagamento = {
       idPagamento: '20210001',
       valor: 9900,
       parcelas: 1
     };

     const cliente = {
       nome: 'Nome',
       email: 'user@email.com'
     };

     const cartaoCredito = {
       numeroCartao: 4545000099991111,
       nomenoCartao: 'NOME',
       validade: '01/2025',
       codigoSeguranca: 123
     };

     this.bancoDev.show(pagamento, cliente, cartaoCredito);
   }

   <BancoDev
     setup={paymentSetup}
     ref={bancoDev => {this.bancoDev = bancoDev}}
     successfulPayment={(data) => { this.setState({ status: 'Payment completed successfully!', paymentData: data}) }}
     failedPayment={() => { this.setState({ status: 'Payment failed!' }) }}
     canceled={() => { this.setState({ status: 'Payment canceled' }) }}
   />

 ````
