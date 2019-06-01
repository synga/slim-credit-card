import { Component, State, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  /**
   * O tipo do cartão
   */
  @Prop() type: string;

  /**
   * Propriedades do cartão de credito
   */
  @State() CC_Brand: number; // none = 0, visa = 1, master = 2, amex = 3
  @State() CC_CardNumber: string;
  @State() CC_Owner: string;
  @State() CC_ValidUntil: string;
  @State() CC_Security: string;
  /**
   * Array com todos os campos do cartão de credito disponiveis para ser iterado
   * no template
   */
  private CC_Fields: Array<string> = ['CC_CardNumber', 'CC_ValidUntil', 'CC_Owner',  'CC_Security'];

  /**
   * O input que está com o focus, para colorir o campo no cartão para indicação visual
   */
  @State() focusedInput: string;

  /**
   * Vai verificar qual é o tipo do cartão de credito
   * Mantem um Watcher pra ser executado toda vez que digitar o numero do cartão
   */
  @Watch('CC_CardNumber') checkCardBrand(value) {
    const initial = value.substr(0, 2);
    if (/^4/.test(initial)) this.CC_Brand = 1;
    else if (/^5[1-5]/.test(initial)) this.CC_Brand = 2;
    else if (/^3[47]/.test(initial)) this.CC_Brand = 3;
    else this.CC_Brand = 0;
  }

  /**
   * Lida com o input no formulário e atribui o valor ao campo correspondente
   * @param event evento do input
   * @param inputField Campo do cartão de credito que irá receber o valor
   */
  handleFormInput = (event, inputField) => (this[inputField] = event.target.value);

  render() {
    return <div class="component">
      <div class="credit-card">
        <div class={`credit-card__inner ${this.type ? this.type : 'black'}`}>
          {/* A FRENTE DO CARTÃO DE CRÉDITO */}
          <div class="credit-card__front">
            <div class="credit-card__brand">{this.CC_Brand}</div>
            <div class="credit-card__chip">|____|</div>
            <div class="credit-card__number">
              {/* CRIAR INPUTS */}
              <input type="text" class={this.focusedInput === 'CC_CardNumber' ? 'focused' : ''} readOnly placeholder="XXXX XXXX XXXX XXXX" />
              {this.CC_CardNumber}
            </div>
            <div class="credit-card__dates">
              <input type="text" class={this.focusedInput === 'CC_ValidUntil' ? 'focused' : ''} readOnly placeholder="XX/XX" />
              {this.CC_ValidUntil}
            </div>
            <div class="credit-card__owner">
              <input type="text" class={this.focusedInput === 'CC_Owner' ? 'focused' : ''} readOnly placeholder="XXXXXXXX X XXXXX" />
              {this.CC_Owner}
            </div>
          </div>
          {/* PARTE DE TRÁS DO CARTÃO DE CRÉDITO */}
          <div class="credit-card__back">back</div>
        </div>
      </div>
      <div class="card-form">
        {this.CC_Fields.map((field) =>
          <div class="card-form__block">
            <input type="text" class="card-form__input"
              value={this[field]}
              onFocus={() => this.focusedInput = field }
              onBlur={() => this.focusedInput = null }
              onInput={(ev) => this.handleFormInput(ev, field) }/>
            <button class="card-form__butt">next</button>
          </div>
        )}
      </div>
    </div>;
  }
}
