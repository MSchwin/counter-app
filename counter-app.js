/**
 * Copyright 2025 MSchwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 1000;
    this.max = -1000;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: {type: Number, reflect: true},
      min: {type: Number },
      max: {type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="10"]) {
        color: var(--ddd-theme-default-athertonViolet);

      }
      :host([count="18"]) {
        color: var(--ddd-theme-default-landgrantBrown);
        background-color: var(--ddd-theme-default-roarMaxlight);
        
      }
      :host([count="21"]) {
        color: var(--ddd-theme-default-globalNeon);

      }
      
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter{
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
<confetti-container id="confetti">
  <div class='counter'>${this.count}</div>
  <div class="buttons">
    <button @click="${this.decrease}" >-1</button>
    <button @click="${this.increase}">+1</button>
  </div>
  <div class= Maxmin>
  Max value
  <textarea id="Max"  @input="${this.updateLimits}" ></textarea>
  <br>
  Min value
  <textarea id="Min"  @input="${this.updateLimits}"></textarea>
  </div>
  </confetti-container>
</div>`;
  }
  updateLimits(e) {
    const target = e.target;
    const val = Number(target.value);
    if (target.id === "Max") {
      this.max = val;
    } else if (target.id === "Min") {
      this.min = val;

  }
}
  increase() {
    if (this.count != this.max)
      {
        this.count++;

      }
    else
    {
      
    }
    

  }
  decrease() {
    if (this.count != this.min)
      {
        this.count--;

      }
    else
    {
      
    }
    
  }
  reset() {
    this.count = 0;
  }
  

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count')) {
      // do your testing of the value and make it rain by calling makeItRain
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);