import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  form: FormGroup;
  address: FormArray;

  regex = /[0-9\+\-\ ]/;

  

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.form = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: [""],
      address: this.fb.array([this.addressLines()]),
      checkbox: ["", Validators.required]
    });

    console.log("form", this.form);
  }

  onSubmit() {
    console.log("value:", this.form.value);
  }

  formArrayControls() {
    let fA = this.form.get("address") as FormArray;
    return fA.controls;
  }

  addressLines(): FormGroup {
    return this.fb.group({
      addressLine1: ["", Validators.required],
      addressLine2: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      pincode: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(this.regex)
        ]
      ]
    });
  }

  addNewAddress() {
    this.addAddressLines();
  }

  removeAddress(addres: any) {
    let index = this.address.controls.indexOf(addres);

    console.log("this.address:", this.address);

    this.address.removeAt(index);
  }

  addAddressLines(): void {
    this.address = this.form.get("address") as FormArray;
    this.address.push(this.addressLines());
  }
}
