document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const messageBox = document.querySelector('.message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const produto = {
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value,
            categoria: document.getElementById('categoria').value
        };

 
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
            form.reset();
        })
        .catch(error => {
            messageBox.innerHTML = `<p style="color: red;">Erro ao cadastrar produto. Tente novamente.</p>`;
            console.error('Erro:', error);
        });
    });
});
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

hamburgerMenu.addEventListener('click', () => {
  navMenu.style.right = navMenu.style.right === '0px' ? '-250px' : '0px';
});
document.getElementById('hamburger').addEventListener('click', function() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  });
  