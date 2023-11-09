import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  readonly APIURL = "http://localhost:3002/"

  constructor(private http:HttpClient) {
  }
  notes:any=[];

  refreshNotes(){
    this.http.get(this.APIURL).subscribe(data => {
      this.notes = data
    })
  }

  ngOnInit(){
    this.refreshNotes()
  }

  addNotes(){
    let newNotes=(<HTMLInputElement>document.getElementById("newNotes")).value

    this.http.post(this.APIURL + 'save', { text: newNotes }).subscribe(data => {
      alert("Added Successfully");
      this.refreshNotes();
    })
  }

  deleteNotes(note:any){
    this.http.post(this.APIURL + 'delete', {
      _id: note._id,
      text: note.text
    }).subscribe(data => {
      alert(data);
      this.refreshNotes();
    })
  }
}
