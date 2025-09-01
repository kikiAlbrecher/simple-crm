import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule,
    DialogEditAddressComponent, DialogEditUserComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user: User = new User();
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? '';

      const userDocRef = doc(this.firestore, `users/${this.userId}`);

      this.user$ = docData(userDocRef, { idField: 'id' }) as Observable<User>;

      this.user$.subscribe(user => {
        this.user = new User(user);
      });
    });
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent, {
      data: new User(this.user.toJSON())
    });
  }

  editUserAddress() {
    this.dialog.open(DialogEditAddressComponent, {
      data: new User(this.user.toJSON())
    });
  }
}