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

  disabledAgreement: boolean = true;
  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.dialogFormGroup = this.fb.group({
    //   confirmAction: [false]
    // });

    this.form = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: [""],
      address: this.fb.array([this.addressLines()]),
      checkbox: [""]
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ]
    });
  }

  addNewAddress() {
    this.addAddressLines();
  }

  removeAddress(addres: any) {
    let index = this.address.controls.indexOf(addres);
    this.address.removeAt(index);
  }

  addAddressLines(): void {
    this.address = this.form.get("address") as FormArray;
    this.address.push(this.addressLines());
  }
}
