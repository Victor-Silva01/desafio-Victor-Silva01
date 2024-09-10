class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'leao', quantidade: 1 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(especie, quantidade) {
      const animal = this.animais[especie.toUpperCase()];
  
      if (!animal) {
        return { erro: 'Animal inválido', recintosViaveis: null };
      }
  
      if (isNaN(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida', recintosViaveis: null };
      }
  
      const recintosViaveis = this.recintos.filter(recinto => {
        return this.podeAcomodarAnimal(recinto, animal, quantidade);
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável', recintosViaveis: null };
      }
  
      return {
        recintosViaveis: recintosViaveis.map(recinto => {
          const espacoLivre = recinto.tamanho - this.calcularEspacoOcupado(recinto, animal, quantidade);
          return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        })
      };
    }
  
    podeAcomodarAnimal(recinto, animal, quantidade) {
      const espacoNecessario = this.calcularEspacoOcupado(recinto, animal, quantidade);
  
      const biomaCompativel = animal.bioma.includes(recinto.bioma) || (animal.especie === 'HIPOPOTAMO' && recinto.bioma.includes('savana') && recinto.bioma.includes('rio'));
      if (!biomaCompativel) return false;
  
      if (recinto.tamanho < espacoNecessario) return false;
  
      for (const animalPresente of recinto.animais) {
        const especiePresente = this.animais[animalPresente.especie.toUpperCase()];
  
        if (animal.carnivoro && especiePresente.carnivoro && especiePresente.especie !== animal.especie) {
          return false;
        }
  
        if (!animal.carnivoro && especiePresente.carnivoro) {
          return false;
        }
      }
  
      return true;
    }
  
    calcularEspacoOcupado(recinto, animal, quantidade) {
      let espacoOcupado = animal.tamanho * quantidade;
  
      for (const animalPresente of recinto.animais) {
        const especiePresente = this.animais[animalPresente.especie.toUpperCase()];
        espacoOcupado += especiePresente.tamanho * animalPresente.quantidade;
      }
  
      return espacoOcupado;
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  