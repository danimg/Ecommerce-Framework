import { Directive, Input, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';

export const MESSAGE_DEFAULT: any[] = [
  {
    'type': 'required',
    'message': 'O Campo é obrigatório.'
  },
  {
    'type': 'minlength',
    'message': 'O campo deverá conter no minimo {0} caractere(s).'
  },
  {
    'type': 'maxlength',
    'message': 'O campo deverá conter no máximo {0} caractere(s).'
  },
  {
    'type': 'max',
    'message': 'O campo deverá conter no máximo {0}.'
  },
  {
    'type': 'min',
    'message': 'O campo deverá conter no minimo {0}.'
  },
  {
    'type': 'cep',
    'message': 'CEP informado é inválido.'
  },
  {
    'type': 'cpf',
    'message': 'CPF informado é inválido.'
  },
  {
    'type': 'cnpj',
    'message': 'CNPJ informado é inválido.'
  },
  {
    'type': 'email',
    'message': 'E-Mail informado é inválido.'
  },
  {
    'type': 'somenteLetras',
    'message': 'O campos deverá conter somente letra(s).'
  },
  {
    'type': 'somenteNumeros',
    'message': 'O campos deverá conter somente número(s).'
  },
  {
    'type': 'password',
    'message': 'Senha deverá conter no minimo 8 caracteres, onde: 1 letra maiúscula, 1 letra minúscula e 1 número'
  },
  {
    'type': 'equal',
    'message': 'Confirmação de senha inválida.'
  },
  {
    'type': 'datetime-local',
    'message': 'Data ou hora inválida.'
  },
  {
    'type': 'date',
    'message': 'Data inválida.'
  },
  {
    'type': 'cns',
    'message': 'CNS inválido.'
  },
  {
    'type': 'esusNomeEspaco',
    'message': 'O nome possui espaço duplicado.'
  },
  {
    'type': 'esusNomeLetras',
    'message': 'O nome só pode conter letras do alfabeto romano (incluindo K, W, Y)'
  },
  {
    'type': 'esusNomeComposto',
    'message': 'O nome não está no padrão do e-sus (nome composto)'
  },
  {
    'type': 'esusNomeDoisCaracteres',
    'message': 'O nome possui termos com apenas dois caracteres, não entrará na base de dados'
  },
  {
    'type': 'esusNomeUmTermo',
    'message': 'O nome possui um único termo, não entrará na base de dados'
  }, {
    'type': 'esusMinlength',
    'message': 'O campo deverá conter no minimo 3 caractere(s).'
  },
  {
    'type': 'esusMaxlength',
    'message': 'O campo deverá conter no máximo 70 caractere(s).'
  },
  {
    'type': 'dataNascimentoMax',
    'message': 'Data de nascimento não pode ser maior que data atual.'
  },
  {
    'type': 'dataNascimentoMin',
    'message': 'Data de nascimento não pode ser menor que 130 anos.'
  },
  {
    'type': 'dataMaiorDiaAtual',
    'message': 'A data não deve ser posterior a data atual.'
  },
  {
    'type': 'numeroPositivo',
    'message': 'O numero deve ser maior que zero.'
  },
  {
    'type': 'numeroMaximo',
    'message': 'O numero deve ser maior que {0}.'
  },
  {
    'type': 'datetime',
    'message': 'Data e hora inválida'
  },
  {
    'type': 'dataInicial',
    'message': 'Data inicial não pode ser superior a data final'
  },
  {
    'type': 'dataFinal',
    'message': 'Data final não pode ser inferior a data inicial'
  }
];

export const HasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[validation]'
})

export class ValidationMessageDirective implements OnInit {

  @Input() customMessage: any[] = [];
  parent: any;
  elements: any[] = [];

  constructor(
    private control: NgControl,
    private element: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.parent = this.renderer.parentNode(this.element.nativeElement);
    this.control.statusChanges.subscribe(status => {
      this.refresh(status);
    });
    this.atualizarCampo();
  }

  atualizarCampo() {
    const label = this.parent.querySelector('label');
    if (label) {
      if (label.innerText.includes('*')) {
        label.innerText = label.innerText.replace('*', '');
      }
      if (HasRequiredField(this.control.control)) {
        const obrigatorio = this.renderer.createText('*');
        this.renderer.appendChild(label, obrigatorio);
      }
    }
  }
  @HostListener('blur', ['$event'])
  onBlur(event) {
    this.refresh(this.control.status);
  }

  refresh(status) {
    this.renderer.removeClass(this.element.nativeElement, 'is-valid');
    this.renderer.removeClass(this.element.nativeElement, 'is-invalid');
    this.elements.forEach(child => {
      this.renderer.removeChild(this.parent, child);
    });

    this.elements = [];

    if (status === 'VALID' && this.control.value) {
      this.renderer.addClass(this.element.nativeElement, 'is-valid');
      this.customMessage.forEach(message => {
        if (message.type === 'sucesso') {
          this.showMessage(message, 'valid-feedback');
        }
      });
    } else if (status === 'INVALID') {
      this.renderer.addClass(this.element.nativeElement, 'is-invalid');

      const defaults = MESSAGE_DEFAULT.filter((item) => {
        return this.customMessage.filter(filter => {
          return filter.type === item.type;
        }).length === 0;
      });

      defaults.forEach(message => {
        if (this.control.hasError(message.type)) {
          this.showMessage(message, 'invalid-feedback');
        }
      });

      this.customMessage.forEach(message => {
        if (this.control.hasError(message.type)) {
          this.showMessage(message, 'invalid-feedback');
        }
      });
    }
    this.atualizarCampo();
  }

  showMessage(message: any, className: string) {
    let msg = message.message;
    if (message.type === 'min') {
      msg = msg.replace('{0}', this.control.errors.min.min);
    } else if (message.type === 'max') {


      msg = msg.replace('{0}', this.control.errors.max.max);
    } else if (message.type === 'minlength') {
      msg = msg.replace('{0}', this.control.errors.minlength.requiredLength);
    } else if (message.type === 'maxlength') {
      msg = msg.replace('{0}', this.control.errors.maxlength.requiredLength);
    }

    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, className);
    const text = this.renderer.createText(msg);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.parent, div);
    this.elements.push(div);

  }
}
