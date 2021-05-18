import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/api/services/produto.service';
import { NgbLoadingService } from 'src/app/shared/controls/loading/loading.service';
import { NgbToastService } from 'src/app/shared/controls/toasts/toast.service';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.css']
})
export class ProdutoViewComponent implements OnInit {
  form: FormGroup;
  constructor(
    private produtoSrv: ProdutoService,
    private formBuilder: FormBuilder,
    private location: Location,
    private toastSrv: NgbToastService,
    private loadingSrv: NgbLoadingService,
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
         produto: new FormControl(null, [Validators.required]),
        descricao: new FormControl(null, [Validators.required]),
        valor: new FormControl(null, [Validators.required]),
        saldoEstoque: new FormControl(null, [Validators.required]),
        img: new FormControl(null),
       
      });
  }

}
