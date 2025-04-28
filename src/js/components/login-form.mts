export default class LoginForm extends HTMLElement {
    constructor() { 
        super();
        const shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback(): void {
      this.render();
      this.shadowRoot?.querySelector('form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = this.shadowRoot?.querySelector('#email') as HTMLInputElement;
        const password = this.shadowRoot?.querySelector('#password') as HTMLInputElement;
        if(!email?.value || !password?.value) {
          return;
        }
        console.log(email, password)
        this.login(email.value, password.value);
      });
    }
    render() {
      const template = document.createElement('template');
      template.innerHTML = `
        <form>
          <label for="email">Email</label>
          <input type="text" id="email">
          <label for="password">Password</label>
          <input type="password" id="password">
          <button>Submit</button>
        </form>
      `;
      this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }
    async login(email: string, password: string) {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        };
        const response = await fetch('http://localhost:3001/sessions', options);
       
    }
}
customElements.define('login-form', LoginForm);
  
