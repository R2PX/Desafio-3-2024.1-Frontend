async function getUFs() {
    const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert("Erro ao obter dados da api do IBGE.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function refreshUFSelect() {
    const ufSelectElement = document.getElementById("ufSelect");
  
    try {
        const ufs = await getUFs();
        ufSelectElement.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.text = "Selecione uma UF";
        ufSelectElement.appendChild(defaultOption);

        ufs.forEach((uf) => {
          const option = document.createElement("option");
          option.value = uf.sigla;
          option.text = uf.sigla;
          ufSelectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getMunicipiosByUF(ufCode) {
    const apiUrl =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufCode}/municipios`;
  
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            alert("Erro ao obter dados da api do IBGE por UFs.");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateMunicipioList(ufCode) {
    const listaDeMunicipios = document.getElementById('municipiosLista');
    
    try {
        const municipios = await getMunicipiosByUF(ufCode);
        listaDeMunicipios.innerHTML = '';
  
        municipios.forEach((municipio) => {
            const itemDaLista = document.createElement('p');
            itemDaLista.textContent = municipio.nome;
            listaDeMunicipios.appendChild(itemDaLista);
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
}
  
refreshUFSelect();
const ufSelectElement = document.getElementById('ufSelect');
ufSelectElement.addEventListener('change', function () {
    const selectedUF = ufSelectElement.value;
    if (selectedUF) {
        updateMunicipioList(selectedUF);
    } }
);
  