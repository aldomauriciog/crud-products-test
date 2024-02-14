import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { ProductModel } from 'src/app/model/product-model';
import { SearchModel } from 'src/app/model/search-model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterContentInit {

  listProducts: ProductModel[] = [];
  listSearch: SearchModel[] = [];
  formProduct: FormGroup = new FormGroup({});
  formSearch: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  isRequiredName: boolean = false;
  isRequiredDesc: boolean = false;
  isDescInvalid: boolean = false;
  isRequiredPrice: boolean = false;
  isRequiredBrand: boolean = false;
  public page!: number;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {

    this.formProduct.clearValidators;

    this.list();
    this.formProduct = new FormGroup({
      product_id: new FormControl(''),
      product_name: new FormControl('', [Validators.required]),
      product_desc: new FormControl(''),
      price: new FormControl(''),
      brand: new FormControl(''),
      status: new FormControl('1')
    })

    this.formSearch = new FormGroup({
      search: new FormControl('')
    })
  }

  ngAfterContentInit(): void {
    
  }

  list() {
    this.productService.getProducts().subscribe(resp => {
      if (resp) {
        this.listProducts = resp;
      }
    })
  }

  listForName() {
    let name = (<HTMLInputElement>document.getElementById('search')).value;
    if (name == "") {
      this.list();
    }

    this.productService.getProductsForName(name).subscribe(resp => {
      if (resp) {
        this.listProducts = resp;
      }
    })
  }

  validateName() {
    let name = this.formProduct.controls['product_name'].value;
    if (name == '') {
      this.isRequiredName = true;
      return;
    } else {
      this.isRequiredName = false;
    }
  }

  validateDesc() {
    let desc = this.formProduct.controls['product_desc'].value;
    if (desc == '') {
      this.isRequiredDesc = true;
      this.isDescInvalid = false;
    } else {
      if (desc.length < 10) {
        this.isDescInvalid = true;
      } else {
        this.isDescInvalid = false;
      }
      this.isRequiredDesc = false;
    }
  }

  validatePrice() {
    let price = this.formProduct.controls['price'].value;
    if (price == '') {
      this.isRequiredPrice = true;
    } else {
      this.isRequiredPrice = false;
    }
  }

  validateBrand() {
    let brand = this.formProduct.controls['brand'].value;
    if (brand == '') {
      this.isRequiredBrand = true;
    } else {
      this.isRequiredBrand = false;
    }
  }

  save() {

    //name
    let name = this.formProduct.controls['product_name'].value;
    if (name == '') {
      this.isRequiredName = true;
      return;
    } else {
      this.isRequiredName = false;
    }

    //description
    let desc = this.formProduct.controls['product_desc'].value;
    if (desc == '') {
      this.isRequiredDesc = true;
      return;
      this.isDescInvalid = false;
    } else {
      if (desc.length < 10) {
        this.isDescInvalid = true;
        return;
      } else {
        this.isDescInvalid = false;
      }
      this.isRequiredDesc = false;
    }

    //price
    let price = this.formProduct.controls['price'].value;
    if (price == '') {
      this.isRequiredPrice = true;
      return;
    } else {
      this.isRequiredPrice = false;
    }

    //brand
    let brand = this.formProduct.controls['brand'].value;
    if (brand == '') {
      this.isRequiredBrand = true;
      return;
    } else {
      this.isRequiredBrand = false;
    }

    this.formProduct.controls['status'].setValue('1');
    this.productService.saveProduct(this.formProduct.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formProduct.reset();
      }
    })
  }

  update() {
    this.productService.updateProduct(this.formProduct.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formProduct.reset();
        let modal = document.getElementById('exampleModal');
        modal.style.visibility === "hidden";
      }
    })
  }

  delete(id: any) {
    this.productService.deleteProduct(id).subscribe(resp => {
      if (resp) {
        this.list();
      }
    })
  }

  newProduct() {
    this.isUpdate = false;
    this.formProduct.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formProduct.controls['product_id'].setValue(item.product_id);
    this.formProduct.controls['product_name'].setValue(item.product_name);
    this.formProduct.controls['product_desc'].setValue(item.product_desc);
    this.formProduct.controls['price'].setValue(item.price);
    this.formProduct.controls['brand'].setValue(item.brand);
  }

}
