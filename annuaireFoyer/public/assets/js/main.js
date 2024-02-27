import { Benevole } from "./Benevole.js";
import { AnnuaireRepository } from "./AnnuaireRepository.js";


const app = {
    data() {
        return {
            listeBenevoles: [],
            listeResponsables: [],
            selectedBenevole: null,
            benevoleChoice: null,
            responsable: null
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
        selectResponsable(event) {  
            console.log(event.target.value);         
            let responsableId = event.target.dataset.id;
            this.responsable = this.listeResponsables.find(x => x.id == responsableId);          
    
                  
                        this.responsable.scrollIntoView({ behavior: 'smooth', block: 'start' });
              
            
             
            },
            computed: { 
                nbBenevole() {
                return this.listeBenevoles.length;
              
            }
        
         
        }
        
        
  

    }
}
    


Vue.createApp(app).mount('#app');


