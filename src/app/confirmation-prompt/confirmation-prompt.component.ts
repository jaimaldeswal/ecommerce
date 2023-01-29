import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styleUrls: ['./confirmation-prompt.component.css']
})
export class ConfirmationPromptComponent implements OnInit {
  headline = 'Are you sure ?';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit(): void {
    if (this.data.tagline) {
      this.headline = this.data.tagline;
    }
  }
  onSubmit() {
    this.dialogRef.close('OK');
  }
}
