import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PurchaseOrder} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32class';

  // Dependency Injection to create an instance of FormBuilder
  private fb = inject(FormBuilder);

  // Form-related properties
  // Letting typescript know that form is am instance of FormGroup
  // ! (non-null operator) to be handles
  protected form!: FormGroup;
  protected lineItems!: FormArray

  // Constructor injection
  constructor() {
    console.info('in constructor');
  }

  // VALIDATION FIELDS
  // must have validity in form and an activity
  protected invalid():boolean{
    return this.form.invalid|| this.lineItems.controls.length <=0;
  }
  protected isCtrlValid(ctrlName:string){
    return !this.form.get(ctrlName)?.invalid;
  }

  // Form Group is initialized here
  ngOnInit() {
    console.info('>>> ngOnInit()');
    this.form = this.createForm();
  }

  // Defines and creates the Form structure
  private createForm():FormGroup {
    // initialise empty array for line items
    this.lineItems = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('',[Validators.email]),
      deliveryDate: this.fb.control<string>('', [Validators.required]),
      rush: this.fb.control<boolean>(false),
      lineItems: this.lineItems
    })
  }

  // Process Form
  protected processForm() {
    const values: PurchaseOrder = this.form.value;

    console.info('>>> Processing Form',values);
    this.form.reset();
  }

  // Generates a new Form Group
  // Pushes Form Group into LineItems
  protected addLineItem(){
    this.lineItems.push(this.createLineItem());
  }
  // Form Group of a Line Item
  private createLineItem(){
    return this.fb.group({
      itemName: this.fb.control<string>('', [Validators.required]),
      quantity: this.fb.control<number>(0,[Validators.required,Validators.min(1)]),
      unitPrice: this.fb.control<number>(0.1, [Validators.required,Validators.min(0.1)]),
    })
  }

  // Delete lineItem
  protected deleteLineItem(idx:number){
    console.log("remove:",idx);
    this.lineItems.removeAt(idx)
  }
}
