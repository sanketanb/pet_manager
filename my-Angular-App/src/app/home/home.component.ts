import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display_products: any;
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.showProducts()
  }
  gotoNew(){
    this.router.navigate([`/new`]);
  }
  gotoDetails(id){
    this.router.navigate([`/details/${id}`]);
  }
  gotoEdit(id){
    this.router.navigate([`/edit/${id}`]);
  }
  showProducts() {
    let obs = this._httpService.showProducts();
    console.log("hello from show products");
    obs.subscribe(data => {
      this.display_products = data['data'];
      console.log(this.display_products);
      console.log("created at dates are below:")
    })
  }

}
