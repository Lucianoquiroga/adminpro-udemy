import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

  this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log( 'Subs', numero ),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    // tslint:disable-next-line:prefer-const
    return new Observable( observer => {

      // tslint:disable-next-line:prefer-const
      let contador = 0;

      // tslint:disable-next-line:prefer-const
      let intervalo = setInterval( () => {


        contador += 1;

        // tslint:disable-next-line:prefer-const
        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   observer.error('Auxilio');
        // }

      }, 500);

    })
    .retry(2)
    .map( (resp: any ) => {

      return resp.valor;

    })
    .filter( (valor, index ) => {

      if ( (valor % 2) === 1  ) {
        // impar
        return true;
      } else {
        // par
        return false;
      }

    });

  }

}
