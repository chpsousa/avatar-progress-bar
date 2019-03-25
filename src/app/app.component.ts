import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

import { Subscription, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, finalize } from 'rxjs/operators';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements OnInit, OnDestroy {
  
  identifier: string;
  subscribe: Subscription;
  user$: Observable<any>;
  selectedFile: ImageSnippet;
  src: 'https://picsum.photos/200/?random';

  @ViewChild('imageInput') imageInput: ElementRef;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.user$ = of({});
    this.form.patchValue({});
  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  test(){
    this.imageInput.nativeElement.click();
  }

  save() {
  }

  closeSidenav() {
  }

  tabChange(evt: MatTabChangeEvent) {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      console.log(this.selectedFile);
      setTimeout(() => {
        this.selectedFile.pending = false;
    }, 5000);
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();
      //   },
      //   (err) => {
      //     this.onError();
      //   })
    });

    reader.readAsDataURL(file);
  }

}
