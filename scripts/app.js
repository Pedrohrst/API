document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const messageBox = document.querySelector('.message');

    // Função para lidar com o envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o envio do formulário padrão

        const produto = {
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value,
            categoria: document.getElementById('categoria').value
        };

        // Chamada para a API com o método POST
        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            messageBox.innerHTML = `<p>Produto cadastrado com sucesso! ID: ${data.id}</p>`;
            form.reset(); // Limpar o formulário
        })
        .catch(error => {
            messageBox.innerHTML = `<p style="color: red;">Erro ao cadastrar produto. Tente novamente.</p>`;
            console.error('Erro:', error);
        });
    });
});
