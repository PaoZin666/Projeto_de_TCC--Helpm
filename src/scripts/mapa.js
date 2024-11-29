window.onload = function () {
    const mapaContainer = document.getElementById('mapa');
    const regiaoInfo = document.getElementById('regiaoNome');

    // Definindo as regiões com seus números e nomes
    const regioesInfo = {
        fil10: { numero: 6, nome: 'Região 6' },
        fil11: { numero: 10, nome: 'Região 10' },
        fil12: { numero: 8, nome: 'Região 8' },
        fil13: { numero: 7, nome: 'Região 7' },
        fil14: { numero: 4, nome: 'Região 4' },
        fil15: { numero: 1, nome: 'Região 1' },
        fil16: { numero: 5, nome: 'Região 5' },
        fil17: { numero: 3, nome: 'Região 3' },
        fil18: { numero: 2, nome: 'Região 2' },
        fil19: { numero: 9, nome: 'Região 9' },
        fil20: { numero: 11, nome: 'Região 11' }
    };

    // Acessa o conteúdo do SVG
    const svgDoc = mapaContainer.contentDocument;

    // Verifica se o SVG foi carregado corretamente
    if (svgDoc) {
        console.log("SVG carregado com sucesso!");

        // Seleciona todos os elementos <path> dentro do SVG
        const paths = svgDoc.querySelectorAll('path');

        // Itera sobre os elementos <path> e altera suas cores
        paths.forEach((path) => {
            // Verifica se a classe do path começa com 'fil'
            const pathClass = path.getAttribute('class');
            if (pathClass && pathClass.startsWith('fil')) {
                // Verifica se o pathClass existe no objeto regioesInfo
                if (regioesInfo[pathClass]) {
                    const region = regioesInfo[pathClass];

                    // Altera a cor do fill com base no índice da região
                    const regioesCores = {
                        6: '#FF6666',  
                        10:'#FF3333',  
                        8: '#FF0000',  
                        7: '#990000',  
                        4: '#FF6666',  
                        1: '#FF3333', 
                        5: '#FF0000', 
                        3: '#990000', 
                        2: '#FF6666', 
                        9: '#FF3333', 
                        11:'#FF0000'
                    };

                    // Altera a cor do path
                    path.setAttribute('fill', regioesCores[region.numero]);
                    console.log(`Cor da ${region.nome} foi alterada para ${regioesCores[region.numero]}`);

                    // Adiciona o evento de hover para mostrar o número e nome da região
                    path.addEventListener('mouseenter', () => {
                        regiaoInfo.textContent = `${region.nome} (Número da Região: ${region.numero})`;
                    });

                    path.addEventListener('mouseleave', () => {
                        regiaoInfo.textContent = 'Passe o mouse sobre uma região.';
                    });
                }
            }
        });
    } else {
        console.error("Não foi possível acessar o conteúdo do SVG.");
    }
};
