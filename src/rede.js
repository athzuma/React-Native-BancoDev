import React from 'react';

function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export const callAPICielo = async (url, merchantid, merchantkey, metodo, body, sucesso, falha) => {
	try {
		const conteudo = (body == null) ? null : JSON.stringify(body);
    const repoCall = await fetch(url, {
			method: metodo,
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        merchantid: merchantid,
        merchantkey: merchantkey,
        'cache-control': "no-cache"
			},
			body: conteudo
		})
		.then(processResponse)
		.then(res => {
			const { statusCode, data } = res;
			if (statusCode == 200 || statusCode == 304 || statusCode == 201) {
				sucesso(data);
			}
			else if (statusCode == 400) {
				falha(`${data.error}`);
			} else {
				falha(`${String(statusCode)} - Falha na rede.`);
			}
		})
		.catch(error => {
			falha('Falha na conexão');
		});
	} catch (err) {
		falha('Falha na operação.');
	}
};
