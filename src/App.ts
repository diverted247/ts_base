// App.ts a simple example module
module app {

    export class Greeter {
        greeting: string;
        constructor( message: string ){
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    export var greeter = new app.Greeter( "world" );

    export var button = document.createElement( 'button' );
    button.textContent = "Say Hello";
    button.onclick = function(){
        alert( greeter.greet() );
    }
    document.body.appendChild( button );
}