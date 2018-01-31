import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // new_product = { "name": "", "type": "", "description":"", "skills":['','','']}
  new_product = { "name": "", "type": "", "description":"", "skill1":"", "skill2":"","skill3":""};
  // display_products: any;
  errors: String = "";
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    // this.new_product = { "name": "", "type": "", "description":"", "skills":['','','']}
    this.new_product = { "name": "", "type": "", "description":"", "skill1":"", "skill2":"","skill3":""};
  }
  gotoHome(){
    this.router.navigate(['/home']);
  }
  createNewProduct() {
    this.errors = "";
    let obs = this._httpService.createNewProduct(this.new_product);
    console.log(this.new_product);
    obs.subscribe((data) => {
      if (data['message'] == "error") {
        if (data['data'].code == 11000) {
          this.errors += "name must be unique";
          console.log("error is", data['data'].code);
        }

        else if (data['data'].errors.name) {
          this.errors += (data['data'].errors.name.message) + " ";
        }

        else if (data['data'].errors.type) {
          this.errors += (data['data'].errors.type.message) + " ";
        }
        else if (data['data'].errors.description) {
          this.errors += (data['data'].errors.description.message) + " ";
        }
        else {
          console.log("got data from post back", data);
          this.router.navigate(['/home']);
        }
      }
      else {
        this.router.navigate(['/home']);
      }
      console.log(data)

    })
  }
}
