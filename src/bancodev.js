import React from 'react';
import { BottomMenu } from './bottommenu';
import InfoScreen from './infoscreen';
import FailScreen from './failscreen';
import SuccessScreen from './successscreen';
import { AnimatedBackgroundBlack } from './backgroundblack';
import { cieloURL } from './auxFunctions';
import { callAPICielo } from "./rede";

export default class BancoDev extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      load: false,
      falha: '',
      sucesso: null,
      pagamento: {
        idPagamento: '',
        valor: null,
        parcelas: 1
      },
      cliente: {
        nome: '',
        email: ''
      },
      cartaoCredito: {
        numeroCartao: null,
        nomenoCartao: '',
        validade: '',
        codigoSeguranca: null
      }
    };
  }

  show = (pagamento, cliente, cartaoCredito) => {
    this.setState({
      pagamento: {
        idPagamento: pagamento.idPagamento,
        valor: pagamento.valor,
        parcelas: pagamento.parcelas
      },
      cliente: {
        nome: cliente.nome,
        email: cliente.email
      },
      cartaoCredito: {
        numeroCartao: cartaoCredito.numeroCartao,
        nomenoCartao: cartaoCredito.nomenoCartao,
        validade: cartaoCredito.validade,
        codigoSeguranca: cartaoCredito.codigoSeguranca
      },
      load: false,
      falha: '',
      sucesso: null,
    });

    this.bgBlack.fadeIn();
    this.bottomMenu._subir();
  }

  close() {
    this.bgBlack.fadeOut();
    this.bottomMenu._baixar();
    if (this.state.falha !== '') {
      this.props.failedPayment();
    } else if (this.state.sucesso === null && this.state.falha === '') {
      this.props.canceled();
    } else if (this.state.sucesso !== null && this.state.falha === '') {
      this.props.successfulPayment(this.state.sucesso);
    }
  }

  pagar = async () => {
    const { pagamento, cliente, cartaoCredito } = this.state;

    this.setState({ load: true });

    var post = {
         "MerchantOrderId": pagamento.idPagamento,
         "Customer":{
            "Name": cliente.nome,
            "email": cliente.email
         },
         "Payment":{
           "Type":"CreditCard",
           "Amount": pagamento.valor,
           "Installments": pagamento.parcelas,
           "SoftDescriptor": this.props.setup.softDescriptor,
           "CreditCard":{
               "CardNumber": cartaoCredito.numeroCartao,
               "Holder": cartaoCredito.nomenoCartao,
               "ExpirationDate": cartaoCredito.validade,
               "SecurityCode": cartaoCredito.codigoSeguranca,
               "Brand": 'visa'
           },
           "Capture": true
         }
    };

    callAPICielo(`${cieloURL(this.props.setup.sandbox)}/1/sales/`, this.props.setup.merchantID, this.props.setup.merchantKEY, 'POST', post,
    (data) => {

      var Status_pay = data.Payment.Status;
      if (Status_pay == 2) {
        const sucesso = {
          tid: data.Payment.Tid,
          paymentid: data.Payment.PaymentId,
        };
        this.setState({ sucesso, load: false });
      } else {
        this.setState({ falha: 'Pagamento não aprovado!', load: false });
      }

    },
    (falha) => {
      this.setState({ falha: falha, load: false });
  	});

  };

  render() {
    const { onClose, setup } = this.props;
    const { pagamento, cliente, cartaoCredito, falha, sucesso } = this.state;
    return (
      <>
        <AnimatedBackgroundBlack ref={bgBlack => {this.bgBlack = bgBlack}}/>
        <BottomMenu load={this.state.load} setup={setup} ref={bottomMenu => {this.bottomMenu = bottomMenu}} onClose={() => { this.close(); }}>

          <FailScreen error={falha} paymentSetup={setup} onClose={() => { this.close(); }}/>

          { (sucesso === null && falha === '') &&
            <InfoScreen
              pagamento={this.state.pagamento}
              cliente={this.state.cliente}
              cartaoCredito={this.state.cartaoCredito}
              paymentSetup={setup}
              makePayment={() => { this.pagar() }}
            />
          }

          { (sucesso !== null && falha === '') &&
            <SuccessScreen paymentSetup={setup} onClose={() => { this.close(); }}/>
          }
        </BottomMenu>
      </>
    );
  }
}
