import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ressource.component.html',
  styleUrl: './ressource.component.scss'
})
export class RessourceComponent {


  
  
    RessourceArray : any[] = [];
    name : string = '';
    typeR : string = '';
    quantite : number = 0;
    statutR : string = '';
    currentRessourceID ="";
  
    constructor (private http: HttpClient) 
    {
     this.getAllRessources();
    }
  
    register()
    {
    
      let bodyData = {
        "name" : this.name,
        "typeR" : this.typeR,
        "quantite" : this.quantite,
        "statutR" : this.statutR
      };
   
      this.http.post("http://localhost:8087/api/ressources/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Ressource Added Successfully");
          this.getAllRessources();
          this.name = '';
          this.typeR = '';
          this.quantite = 0;
          this.statutR  = '';
      });
    }
    getAllRessources()
      {
        
        this.http.get("http://localhost:8087/api/ressources/all")
        .subscribe((resultData: any)=>
        {
            console.log(resultData);
            this.RessourceArray = resultData;
        });
      }
  
      setUpdateRess(data: any)
      {
       this.name = data.name;
       this.typeR = data.typeR;
       this.quantite = data.quantite;
       this.statutR = data.statutR;
       this.currentRessourceID = data.id;     
      }
      UpdateRess() {
        let bodyData = {
          "name": this.name,        // Correction des noms de propriétés
          "typeR": this.typeR,
          "quantite": this.quantite,
          "statutR": this.statutR
        };
      
        if (!this.currentRessourceID) {
          console.error("Erreur : ID de ressource non défini !");
          alert("Erreur : Aucun ID de ressource sélectionné !");
          return; // Empêcher la requête si l'ID est vide
        }
      
        this.http.put(`http://localhost:8087/api/ressources/update/${this.currentRessourceID}`, bodyData, { responseType: 'text' })
          .subscribe((resultData: any) => {
            console.log("Réponse du serveur:", resultData);
            alert("Ressource Updated Successfully");
            this.getAllRessources();
      
            // Réinitialisation des champs
            this.currentRessourceID = '';
            this.name = '';
            this.typeR = '';
            this.quantite = 0;
            this.statutR = '';
          }, (error) => {
            console.error("Erreur lors de la mise à jour:", error);
          });
      }
      
     
      saveRess()
      {
        if(this.currentRessourceID == '')
        {
            this.register();
        }
          else
          {
           this.UpdateRess();
          }      
     
      }
  
      setDeleteRess(data: any)
      {
        
        
        this.http.delete("http://localhost:8087/api/ressources/delete/"+  data.id,{responseType: 'text'}).subscribe((resultData: any)=>
        {
            console.log(resultData);
            alert("Ressource Deleted Successfully") 
            this.getAllRessources();
            this.name = '';
            this.typeR = '';
            this.quantite = 0;
            this.statutR  = '';
      
        });
     
      }
    
      
  

}
