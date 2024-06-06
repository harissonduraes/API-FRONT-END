// ESCONDER E MOSTRAR FORMS
const usuarioCreate = document.getElementById('usuarioCreate');
const usuarioUpdate = document.getElementById('usuarioUpdate');
const usuarioDelete = document.getElementById('usuarioDelete');

const buttonCreate = document.getElementById('buttonCreate');
const buttonUpdate = document.getElementById('buttonUpdate');
const buttonDelete = document.getElementById('buttonDelete');

buttonCreate.addEventListener('click', () => usuarioCreate.classList.toggle('ativar'))
buttonUpdate.addEventListener('click', () => usuarioUpdate.classList.toggle('ativar'))
buttonDelete.addEventListener('click', () => usuarioDelete.classList.toggle('ativar'))

// PEGAR DADOS DO BACK
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

// MOSTRAR NO GRID
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

function atualizarDados(event) {
    //ele não deixa o botão dar reload na página
    event.preventDefault();
    //transformar dados em um objeto
    const formData = {
        id: document.getElementById('id').value,
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
    fetch('https://localhost:7233/api/cad-pessoa', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonFormData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function deletar(event) {
    event.preventDefault();
    const id = document.getElementById('id-delete').value;

    fetch(`https://localhost:7233/api/cad-pessoa/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

}

// document.getElementById('apiForm').addEventListener('submit-back', async function (event) {
// 	event.preventDefault();