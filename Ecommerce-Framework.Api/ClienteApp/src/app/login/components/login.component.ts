import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { NgbToastService } from 'src/app/shared/controls/toasts/toast.service';
import { NgbLoadingService } from 'src/app/shared/controls/loading/loading.service';

import { AccessService } from 'src/app/shared/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  version: string = null;
  //validation_message = messages;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accessSrv: AccessService,
    private toastSrv: NgbToastService,
    private loadingSrv: NgbLoadingService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

  }

  onSubmit() {
    if (this.form.valid) {
      this.loadingSrv.show();
      this.router.navigate(['/produto']);
      //   this.authorizeSrv.login(this.form.value).then(() => {
      //     this.router.navigate(['/produto']);
      //     this.loadingSrv.close();
      //   }).catch(error => {
      //     this.toastSrv.show(error, { classname: 'bg-danger text-white' });
      //     this.loadingSrv.close();
      //   });
      // }
    }
  }
}
