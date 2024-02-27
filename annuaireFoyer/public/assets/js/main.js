import { Benevole } from "./Benevole.js";
import { AnnuaireRepository } from "./AnnuaireRepository.js";


const app = {
    data() {
        return {
            listeBenevoles: [],
            listeBenevolesFiltered: [],
            inputBenevole: [],
            listeResponsables: [],
            selectedBenevole: null,
            benevoleChoice: null,
            responsable: null,
            targetedBenevole: null
         
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
                this.listeBenevoles.sort((a, b) => a.nom.localeCompare(b.nom));
                console.log(this.listeBenevoles);
                this.createListeResponsables();
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error.message);
            }
            this.listeBenevolesFiltered = [...this.listeBenevoles];
        },
       
        openModal(event) {
            let benevoleId = event.target.dataset.id;
            this.selectedBenevole = this.listeBenevoles.find(x => x.id == benevoleId);
            console.log(this.$refs);
            this.$refs.modal.style.display = 'block';
        },
        closeModal() {
            this.$refs.modal.style.display ='none';
        },
        selectBenevole(event) {
            console.log(event.target.value);
            if(parseInt(event.target.value) > 0 ) {
                this.benevoleChoice = this.listeBenevoles.find(x => x.id == event.target.value);
            } else {
                this.benevoleChoice = null;
            }
            
        },
        createListeResponsables() {
            this.listeResponsables = this.listeBenevoles.filter(benevole => benevole.poste !== undefined);
            console.log(this.listeResponsables);
        }, 
        
        filterBenevole(event) {
            if (parseInt(event.target.value) > 0) {
                this.listeBenevolesFiltered = this.listeBenevoles.filter(benevole => this.inputBenevole.includes(benevole.id));
            }
            else {
                this.listeBenevolesFiltered = this.listeBenevoles;
            }
        },
        
        

    
        
        
      
        
        
   
            },    computed: { 
                nbBenevole() {
                return this.listeBenevoles.length;
        
         
        }
        
        
  

    }
}
    


Vue.createApp(app).mount('#app');


