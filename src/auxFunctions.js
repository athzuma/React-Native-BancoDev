export function cieloURL (sandbox) {
  return `https://api${sandbox ? 'sandbox' : ''}.cieloecommerce.cielo.com.br`;
}

export function hideCreditCard (number) {
  var original = '';

  if (typeof number === 'String' || number instanceof String) {
    original = number;
  } else {
    original = String(number);
  }

  const a = original.substring(0,4);
  const b = original.substr(original.length - 4);

  return `${a} **** **** ${b}`;
};

export function formatPrice (number) {
  const price = String((number/100).toFixed(2));
  const brprice = price.replace(".", ",");
  return brprice;
};

export function getFlag (number) {
  var ccnum = '';

  if (typeof number === 'String' || number instanceof String) {
    ccnum = number;
  } else {
    ccnum = String(number);
  }

  var cardnumber = ccnum.replace(/[^0-9]+/g, '');

  var cards = {
      visa      : /^4[0-9]{12}(?:[0-9]{3})/,
      master : /^5[1-5][0-9]{14}/,
      diners    : /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      amex      : /^3[47][0-9]{13}/,
      discover  : /^6(?:011|5[0-9]{2})[0-9]{12}/,
      hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      jcb        : /^(?:2131|1800|35\d{3})\d{11}/,
      aura      : /^(5078\d{2})(\d{2})(\d{11})$/
  };

  for (var flag in cards) {
      if(cards[flag].test(cardnumber)) {
          return flag;
      }
  }

  return false;
};

export function iconNameFlag(number) {
  const flag = getFlag(number);

  if (flag == "visa")
    return 'cc-visa';

  if (flag == "mastercard")
    return 'cc-mastercard';

  if (flag == "amex")
    return 'cc-amex';

  if (flag == "discover")
    return 'cc-discover';

  if (flag == "diners")
    return 'cc-diners-club';

  if (flag == "jcb")
    return 'cc-jcb';

  return 'credit-card';
}
