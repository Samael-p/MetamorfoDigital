import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  imports: [CommonModule,
    FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  teamMembers$: Observable<any[]>;
  newMember = { name: '', role: '', image: '',text: '',
  socials: [] as { icon: string; url: string }[],
};

addSocial() {
  this.newMember.socials.push({ icon: 'fab fa-facebook', url: '' });
}

removeSocial(index: number) {
  this.newMember.socials.splice(index, 1);
}

  constructor(private firestore: Firestore, private auth: Auth, private router: Router) {
  const teamCollection = collection(this.firestore, 'teamMembers');
  this.teamMembers$ = collectionData(teamCollection, { idField: 'id' });
}
async logout() {
  try {
    await signOut(this.auth);
    this.router.navigate(['/']);  // O la ruta que uses para login
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
}


  async addMember() {
    const teamCollection = collection(this.firestore, 'teamMembers');
    await addDoc(teamCollection, this.newMember);
this.newMember = { name: '', role: '', image: '', text: '', socials: [] };
  }

  async deleteMember(id: string) {
    const memberDoc = doc(this.firestore, `teamMembers/${id}`);
    await deleteDoc(memberDoc);
  }


  ngOnInit() {}


  
}