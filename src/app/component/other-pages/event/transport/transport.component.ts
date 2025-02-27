import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.component.html',
  styleUrl: './transport.component.scss'
})
export class TransportComponent {

  TransportArray : any[] = [];
  type : string = '';
  capacite : number = 0;
  statut : string = '';
  currentTransportID ="";

  constructor (private http: HttpClient) 
  {
   this.getAllTransport();
  }

  register()
  {
  
    let bodyData = {
      "type" : this.type,
      "capacite" : this.capacite,
      "statut" : this.statut
    };
 
    this.http.post("http://localhost:8087/api/transports/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Transport Added Successfully");
        this.getAllTransport();
        this.type = '';
        this.capacite = 0;
        this.statut  = '';
    });
  }
  getAllTransport()
    {
      
      this.http.get("http://localhost:8087/api/transports/all")
      .subscribe((resultData: any)=>
      {
      
          console.log(resultData);
          this.TransportArray = resultData;
      });
    }

    setUpdate(data: any)
    {
     this.type = data.type;
     this.capacite = data.capacite;
     this.statut = data.statut;
     this.currentTransportID = data.id;
     
    }
    UpdateRecords() {
      let bodyData = {
        "type": this.type,        // Correction des noms de propriétés
        "capacite": this.capacite,
        "statut": this.statut
      };
    
      if (!this.currentTransportID) {
        console.error("Erreur : ID du transport non défini !");
        alert("Erreur : Aucun ID de transport sélectionné !");
        return; // Empêcher la requête si l'ID est vide
      }
    
      this.http.put(`http://localhost:8087/api/transports/update/${this.currentTransportID}`, bodyData, { responseType: 'text' })
        .subscribe((resultData: any) => {
          console.log("Réponse du serveur:", resultData);
          alert("Transport Updated Successfully");
          this.getAllTransport();
    
          // Réinitialisation des champs
          this.currentTransportID = '';
          this.type = '';
          this.capacite = 0;
          this.statut = '';
        }, (error) => {
          console.error("Erreur lors de la mise à jour:", error);
        });
    }
    
   
    save()
    {
      if(this.currentTransportID == '')
      {
          this.register();
      }
        else
        {
         this.UpdateRecords();
        }      
   
    }

    setDelete(data: any)
    {
      
      
      this.http.delete("http://localhost:8087/api/transports/delete"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Transport Deleted Successfully") 
          this.getAllTransport();
   
          this.type = '';
          this.capacite = 0;
          this.statut  = '';
    
      });
   
    }
  
    



}

