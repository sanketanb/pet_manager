import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '.././http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  update_product = { "name": "", "type": "", "description": "", "skill1": "", "skill2": "", "skill3": "" };
  // update_product: any; we cannot assign any else we get titl undefined before fetching data
  update_errors: String = "";
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
  gotoDetails(id){
    this.router.navigate([`/details/${id}`]);
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
      this.update_product.description=product_data['data'].description
    })
  }

  updateOne(id) {
    let obs = this._httpService.updateProduct(id, this.update_product);
    obs.subscribe(product_data => {
      if (product_data['message'] == "success") {
        this.gotoDetails(id);
      }
      else {
        console.log("message from updateone", product_data['message']);
        this.update_errors += product_data['message'];
      }
    })
  }
}
