import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoModel } from 'src/app/api/models/produto.model';
import { ProdutoService } from 'src/app/api/services/produto.service';
import { NgbLoadingService } from 'src/app/shared/controls/loading/loading.service';
import { NgbToastService } from 'src/app/shared/controls/toasts/toast.service';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrls: ['./produto-add.component.css']
})
export class ProdutoAddComponent implements OnInit {

produto: ProdutoModel[];

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
  onSubmit() {
    // if (this.form.valid) {
    //   this.loadingSrv.show();

    //   this.produtoSrv.post(this.form.value)
    //     .then(() => {
    //       this.toastSrv.show("Registro salvo com sucesso.", {
    //         classname: "bg-success text-white",
    //       });
    // //      this.location.back();
    //       this.loadingSrv.close();
    //     })
    //     .catch((error) => {
    //       this.toastSrv.show(error, { classname: "bg-danger text-white" });
    //       this.loadingSrv.close();
    //     });
    // }
  }

}
