import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '.././http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  update_product = { "name": "", "type": "", "description": "", "skill1": "", "skill2": "", "skill3": "","likes":0 };
  product_id:any;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id'])
      console.log("woooohooooo")
      this.getOne(params['id']);
      this.product_id=params['id']

    });
  }
  gotoHome(){
    this.router.navigate([`/home`]);
  }
  getOne(id) {
    let obs = this._httpService.getOne(id);
    obs.subscribe(product_data => {
      console.log("getOne data", product_data['data']);
      console.log("woohooo2");
      console.log("getOne message", product_data['message']);
      // this.update_product = product_data['data'];
      console.log("skill1", product_data['data'].skills[0]);
      console.log("skills", product_data['data']);
      this.update_product.skill1=product_data['data'].skills[0]
      this.update_product.skill2=product_data['data'].skills[1]
      this.update_product.skill3=product_data['data'].skills[2]
      this.update_product.name=product_data['data'].name
      this.update_product.type=product_data['data'].type
      this.update_product.likes=product_data['data'].likes
      this.update_product.description=product_data['data'].description
    })
  }
  deleteProduct(id) {
    let del_obs = this._httpService.deleteProduct(id);
    del_obs.subscribe(data => {
      console.log("in delete products", data)
      console.log(data);
      this.router.navigate(['/home']);
    })
  }

  voteUp(){
    let obs =this._httpService.patchProduct(this.product_id, 1)
    obs.subscribe(data => 
    this.getOne(this.product_id));
  }
}
