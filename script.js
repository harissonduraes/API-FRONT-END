document.getElementById('apiForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const apiUrl = document.getElementById('apiUrl').value;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API.');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    data.forEach((item) => {
        resultsDiv.innerHTML += `
    <div class="card">
        <label><strong>Dados do Usuário:</strong></label>
        <br>
        <div>
            <li>
            <strong>ID:</strong>
            ${item.id}
            </li>
        </div>
    
        <div>
            <li>
                <strong>Nome:</strong> 
                ${item.nome}
            </li>
        </div>
        <div>
            <li>
                <strong>Peso:</strong>
                ${item.peso}
            </li>
        </div>
        <div>
            <li>
                <strong>Idade:</strong>
                ${item.idade}
            </li>
        </div>
        <div>
            <li>
                <strong>Altura:</strong>
                ${item.altura}
            </li>
        </div>
        <br>
        <div>
        <strong>Profissões:</strong>
        <ul>
            
        ${item.profissoes.map((profissao) => `
        <li>
            <div id="empresaNome">
                <strong>Empresa:</strong> ${profissao.empresaNome}
            </div>
        </li>
        <li>
            <div id="cargoNome">
                <strong>Cargo:</strong> ${profissao.cargoNome}
            </div>
        </li>
        <li>
            <div id="empresaCnpj">
                <strong>CNPJ:</strong> ${profissao.empresaCnpj}
            </div>
        </li>
        <br>
        </div>
    `).join('')}
    </ul>
    </div>
    `;
    });


}



// const button = document.querySelector('span');
// button.addEventListener('click', enviarDados())

function enviarDados(event) {
    //ele não deixa o botão dar reload na página
    event.preventDefault();
    //transformar dados em um objeto
    const formData = {
        nome: document.getElementById('name').value,
        peso: document.getElementById('weight').value,
        idade: document.getElementById('age').value,
        altura: document.getElementById('height').value,
        profissoes: [{
            empresaNome: document.getElementById('empresaNome').value,
            cargoNome: document.getElementById('cargoNome').value,
            empresaCnpj: document.getElementById('empresaCnpj').value,
        }]
    };

    const jsonFormData = JSON.stringify(formData);
    fetch('https://localhost:7233/api/cad-pessoa/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonFormData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}



		// document.getElementById('apiForm').addEventListener('submit-back', async function (event) {
		// 	event.preventDefault();
		// 	const apiUrl = document.getElementById('apiUrl').value;
		// 	const formData = new FormData();
		// 	formData.append('id', document.getElementById('id').value);
		// 	formData.append('nome', document.getElementById('nome').value);
		// 	formData.append('peso', document.getElementById('peso').value);
		// 	formData.append('altura', document.getElementById('altura').value);
		// 	const profissoes = document.getElementById('profissoes').value;
		// 	formData.append('profissoes', JSON.stringify(profissoes));
		// 	try {
		// 		const response = await fetch(apiUrl, {
		// 			method: 'POST',
		// 			body: formData
		// 		});
		// 		if (!response.ok) {
		// 			throw new Error('Erro ao enviar os dados para a API.');
		// 		}
		// 		const data = await response.json();
		// 		displayData(data);
		// 	} catch (error) {
		// 		alert('Erro: ' + error.message);
		// 	}
		// });

		//vou editar o de cima e quero os inputs que recebem os dados para usar dps
		// function displayData(data) {
		// 	const resultsDiv = document.getElementById('results');
		// 	resultsDiv.innerHTML = '';
		// 	data.forEach((item) => {
		// 		resultsDiv.innerHTML += `
		// 	<input id="id" value="${item.id}" />
		// 	<label>
		// 	<strong>Nome</strong>
		// 	</label>
		// 	<input id="nome" value="${item.nome}" />
		// 	<label><strong>Peso</strong></label>
		// 	<input type="number" id="idade" value="${item.idade}" />
		// 	<label><strong>Idade</strong></label>
		// 	<input type="number" id="peso" value="${item.peso}" />
		// 	<label><strong>Altura</strong></label>
		// 	<input type="number" id="altura" value="${item.altura}" />
		// 	<div>
		// 	<strong>Profissões:</strong>
		// 	</div>
		// 	<ul>
				
		// 	${item.profissoes.map((profissao) => `
		// 	<li>
		// 	<div id="empresaNome">
		// 	<strong>Empresa Nome:</strong> ${profissao.empresaNome}
		// 	</div>
		// 	<div id="cargoNome">
		// 	<strong>Cargo Nome:</strong> ${profissao.cargoNome}
		// 	</div>
		// 	<div id="empresaCnpj">
		// 	<strong>Empresa CNPJ:</strong> ${profissao.empresaCnpj}
		// 	</div>
		// 	</li>
		// 	<br>
		// 	`).join('')}
		// 	</ul>
		// 	`;
		// 	});


		// }
