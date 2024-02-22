import { Benevole } from "./Benevole.js";
import { AnnuaireRepository } from "./annuaireRepository.js";

const app = {
    data() {
        return {
            listeBenevoles: [],
            selectedBenevole: null
        }
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            const apiBaseUrl = 'http://localhost:3000/api';
            const annuaireRepository = new AnnuaireRepository(apiBaseUrl);

            try {
                const apiData = await annuaireRepository.fetchBenevolesData();
                this.listeBenevoles = apiData.map(benevole => new Benevole(benevole));
                console.log(this.listeBenevoles);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error.message);
            }
        }
    }
}

Vue.createApp(app).mount('#app');